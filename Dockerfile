# Dockerfile for Next.js application
FROM node:18-alpine AS base

# Build stage: Install dependencies and build the application
FROM base AS builder
WORKDIR /app

# Use pnpm as the preferred package manager
COPY package.json pnpm-lock.yaml* ./
# Install pnpm globally if not available, then install dependencies
# Note: Running this command in the builder stage ensures pnpm is available for the build command.
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build Next.js
# ENV NEXT_PHASE=phase-production-build # Bu ortam değişkeni gerekli olmayabilir

# Set DATABASE_URL as an environment variable for the build process
# This is necessary if your application attempts to access DATABASE_URL during build (e.g., for Prisma validation or static generation)
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Add environment variable to skip database access during build
ENV SKIP_DATABASE_ACCESS_ON_BUILD=true

RUN npx prisma generate
RUN pnpm build # pnpm artık bu aşamada mevcut

# Create the startup script (oluşturma aşamasında oluşturup runner'a kopyalayalım)
RUN echo '#!/bin/sh' > start.sh && \
    echo 'set -e' >> start.sh && \
    echo 'echo "✨ Running database migrations..."' >> start.sh && \
    echo 'npx prisma migrate deploy' >> start.sh && \
    echo 'echo "🌱 Seeding database..."' >> start.sh && \
    echo 'echo "🚀 Starting Next.js application..."' >> start.sh && \
    echo 'exec node server.js' >> start.sh && \
    chmod +x start.sh


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line to disable telemetry during runtime
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy build output and necessary files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Next.js standalone output does not require copying node_modules separately
# It packages necessary files into .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets separately
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy prisma files for migrations and seeding (runner aşaması için gerekli)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Copy package.json for prisma db seed command
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json


# Copy the startup script and make it executable
COPY --from=builder --chown=nextjs:nodejs /app/start.sh ./start.sh
RUN chmod +x ./start.sh


USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to 0.0.0.0 for Docker
ENV HOSTNAME "0.0.0.0"

# Make sure PATH includes node_modules/.bin which is inside the standalone output
ENV PATH /app/node_modules/.bin:$PATH

CMD ["./start.sh"]
