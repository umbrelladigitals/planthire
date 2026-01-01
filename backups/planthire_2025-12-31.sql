--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Debian 15.12-1.pgdg120+1)
-- Dumped by pg_dump version 15.12 (Debian 15.12-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


--
-- Name: AuditLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AuditLog" (
    id text NOT NULL,
    action text NOT NULL,
    details jsonb,
    "userId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "imageUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ContactSubmission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ContactSubmission" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text,
    equipment text,
    message text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Equipment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Equipment" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    specifications jsonb,
    "dailyRate" numeric(10,2),
    "weeklyRate" numeric(10,2),
    "monthlyRate" numeric(10,2),
    available boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: EquipmentCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EquipmentCategory" (
    id text NOT NULL,
    "equipmentId" text NOT NULL,
    "categoryId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: EquipmentDetail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EquipmentDetail" (
    id text NOT NULL,
    "equipmentId" text NOT NULL,
    content text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: EquipmentImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EquipmentImage" (
    id text NOT NULL,
    "equipmentId" text NOT NULL,
    "imageUrl" text NOT NULL,
    "altText" text,
    caption text,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isPrimary" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Gallery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Gallery" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: GalleryImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GalleryImage" (
    id text NOT NULL,
    title text,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SiteSettings" (
    id text NOT NULL,
    key text NOT NULL,
    value text,
    description text,
    category text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    password text,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- Data for Name: AuditLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AuditLog" (id, action, details, "userId", "createdAt") FROM stdin;
cmbsntx1j0001qx01lcguardm	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 00:48:15.752
cmbsnu3ez0003qx01woxik1ff	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 00:48:24.011
cmbsnuq0s0005qx01ol3djr8t	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpn6001tqq2wdcaasd6q", "imagesCount": 0, "equipmentName": "3 Ton Swivel Dumper", "categoriesCount": 1}	\N	2025-06-12 00:48:53.308
cmbso1k1i0001p401ysdt7mcy	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 00:54:12.15
cmbso1si10003p401gyxmq4q6	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 00:54:23.113
cmbso1yqn0005p401kn74qgi6	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 00:54:31.2
cmbso25no0007p401eprwqdco	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 00:54:40.164
cmbso2cen0009p401bq12wso8	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 00:54:48.911
cmbso3gtg000bp401w556w50u	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpn6001tqq2wdcaasd6q", "imagesCount": 0, "equipmentName": "3 Ton Swivel Dumper", "categoriesCount": 1}	\N	2025-06-12 00:55:41.284
cmbsoadt60001qm01mwyysp1d	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 01:01:03.978
cmbsoam0i0003qm01rfigrmq4	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 01:01:14.61
cmbsoasaq0005qm017nnppc24	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 01:01:22.755
cmbsob31y0007qm01a02v4ibc	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "imagesCount": 0, "equipmentName": "6 Ton Straight Tip Dumper", "categoriesCount": 1}	\N	2025-06-12 01:01:36.694
cmbsobb9i0009qm01i676hgo8	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "equipmentId": "cmbsmtpn6001tqq2wdcaasd6q", "imagesCount": 0, "equipmentName": "3 Ton Swivel Dumper", "categoriesCount": 1}	\N	2025-06-12 01:01:47.334
cmbt6shmm0004od0102xy7689	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-12 09:39:01.823
cmbt6shmp0005od01hiyg4i5j	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721141104-894784344-8vDoxMlBGJmnGk3X7LzoVGUB5E4FeQ.png", "siteName": "", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "medium", "siteDescription": ""}	\N	2025-06-12 09:39:01.825
cmbt6srqe000aod0192b4oe5w	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-12 09:39:14.918
cmbt6srqg000bod017kvbxxai	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-06-12 09:39:14.92
cmbt6thne000cod01f7h31bmm	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "equipmentName": "6 Ton Straight Tip Dumper"}	\N	2025-06-12 09:39:48.507
cmbt6uc7z000fod01cm6zp5lx	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "equipmentName": "6 Ton Straight Tip Dumper"}	\N	2025-06-12 09:40:28.127
cmbt6uig3000god01ix44wwjv	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "equipmentName": "6 Ton Straight Tip Dumper"}	\N	2025-06-12 09:40:36.196
cmbt6wpv6000jod01btr0y5yt	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "equipmentName": "6 Ton Straight Tip Dumper"}	\N	2025-06-12 09:42:19.122
cmbt6x1i5000kod01z1cdeyal	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "equipmentName": "6 Ton Straight Tip Dumper"}	\N	2025-06-12 09:42:34.205
cmbta7agg000ood01cedrlgfk	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 11:14:31.217
cmbta8m1g000pod01ewzkf967	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 11:15:32.885
cmbtaa6ss000qod01pjqiaup8	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "equipmentName": "6 Ton Straight Tip Dumper"}	\N	2025-06-12 11:16:46.444
cmbtgvb9i000tod0191eyfg94	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 14:21:09.702
cmbthk8we000uod013gq0u1md	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 14:40:33.038
cmbtiv3yz0000o701040zziu7	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:16:59.483
cmbtivbp10003o701o296sxyi	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:17:09.493
cmbtivh8m0004o701a4yd5aad	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:17:16.679
cmbtjq4dt0005o701wyjr6rsu	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:41:06.354
cmbtjqegn0006o701cpxqpvks	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:41:19.416
cmbtjqk9r0009o701snmh0uly	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:41:26.944
cmbtjqrt4000co701ks6qm06k	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:41:36.713
cmbtjrazu000fo70161b34lie	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:42:01.578
cmbtjrxan000go701u3ttjyjr	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:42:30.479
cmbtjs6uq000ho701osjoj84h	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:42:42.866
cmbtjsm9l000io7014j0w70ft	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:43:02.841
cmbtjtprb000jo701kk2dejsk	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:43:54.023
cmbtjurzw000ko7015iyy2p1w	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:44:43.581
cmbtk6pak0000pa01ifivva9z	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:53:59.948
cmbtk6xjc0001pa0174db4683	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 15:54:10.632
cmbtkp19z0000s701e1sybvlq	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 16:08:15.288
cmbtkp7dg0003s7017cia4v19	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 16:08:23.189
cmbtl1yyn0002nw01q5w7mclt	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 16:18:18.816
cmbtl28y70005nw018oyylgt5	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 16:18:31.759
cmbtl2gym000anw01b6g20bd8	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-12 16:18:42.142
cmbu5egle0002pm01kctozxeg	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-13 01:47:53.859
cmbu5eks80005pm01lqdyv6yc	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-13 01:47:59.289
cmbu5ex8j000apm010wxsxm1z	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-13 01:48:15.428
cmbu5ex8m000bpm01700ko1ub	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-06-13 01:48:15.43
cmbva2du7000epm01hryytedr	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-13 20:46:14.671
cmbva7nv9000lpm01dj8nnlb0	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-13 20:50:20.95
cmbva7xfq000spm01iosfc46t	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-06-13 20:50:33.35
cmbvbaa2j000xpm01gfno3vf5	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtpnb001wqq2wkk01o884", "equipmentName": "6 Ton Straight Tip Dumper"}	\N	2025-06-13 21:20:22.651
cmbvbba810010pm01d8nws6b0	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpn6001tqq2wdcaasd6q", "equipmentName": "3 Ton Swivel Dumper"}	\N	2025-06-13 21:21:09.506
cmbvbdjum0015pm01854d4nba	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtpme001bqq2w49907dk2", "equipmentName": "Rollers 800mm and 1200mm"}	\N	2025-06-13 21:22:55.294
cmbvbh276001cpm01lduigcsq	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtpmw001nqq2wyr78m9mr", "equipmentName": "800Kg Tracked Dumper"}	\N	2025-06-13 21:25:39.042
cmbvbkl7d001hpm01bbssbm3o	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtpmn001hqq2wel56v5mj", "equipmentName": "1.8T Excavator"}	\N	2025-06-13 21:28:23.641
cmbvbrb38001mpm01xljon2uv	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtpm40015qq2wvcburire", "equipmentName": "Floor and Stone Saws"}	\N	2025-06-13 21:33:37.124
cmbvbw3jr001tpm01r0d0a01b	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtply0012qq2w6i8cywvq", "equipmentName": "Cement Mixers"}	\N	2025-06-13 21:37:20.632
cmbvc121e001ypm01fop1vfpz	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtpld000qqq2wgg8zsioi", "equipmentName": "Trench Rammer and Vibrating Plate"}	\N	2025-06-13 21:41:11.955
cmbvc3xaq0023pm01yl45xli5	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtplj000tqq2w759t0yv6", "equipmentName": "Various Water Pumps"}	\N	2025-06-13 21:43:25.779
cmbvc6ua50026pm01uwjxtqnh	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtplo000wqq2wrp3hhe9k", "equipmentName": "Various Generators"}	\N	2025-06-13 21:45:41.837
cmbvccjir002hpm01i2cwkwkf	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 5, "equipmentId": "cmbsmtplt000zqq2wdiczclax", "equipmentName": "SDS Drills and Breakers"}	\N	2025-06-13 21:50:07.827
cmbvcfb15002kpm01sxdkevj1	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpl6000nqq2w42xwzmi1", "equipmentName": "Cobra Reel"}	\N	2025-06-13 21:52:16.793
cmbvch901002ppm01om79e6g1	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtpl1000kqq2w32hojb2w", "equipmentName": "Concrete Pokers Various Sizes"}	\N	2025-06-13 21:53:47.474
cmbvcjrum002wpm01rf8p5rsl	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtpkv000hqq2wdv5wycm7", "equipmentName": "Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers"}	\N	2025-06-13 21:55:45.214
cmbvclvve0035pm01vf6kp241	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmbsmtpkv000hqq2wdv5wycm7", "equipmentName": "Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers"}	\N	2025-06-13 21:57:23.739
cmbvcntbc0038pm01gqf7gekc	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpkn000eqq2w0p8wp59i", "equipmentName": "Laser Level"}	\N	2025-06-13 21:58:53.737
cmbvcq3p8003fpm01lyydc8py	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtpkc000bqq2w5gxxnclw", "equipmentName": "Pressure Washer with Attachments"}	\N	2025-06-13 22:00:40.508
cmbvcsnga003mpm01a50o5p9i	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtpk50008qq2wpqf7zdoc", "equipmentName": "Log Splitter Vertical and Horizontal Use"}	\N	2025-06-13 22:02:39.419
cmbvcy84e003upm01bbpmpjnf	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbvcy847003npm01b6vapi0i", "equipmentName": "concrete finishing tools"}	\N	2025-06-13 22:06:59.486
cmbvd02oa0041pm01nobln48f	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtply0012qq2w6i8cywvq", "equipmentName": "Cement Mixers"}	\N	2025-06-13 22:08:25.739
cmbvd2b3p0044pm01873tpfmb	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpkn000eqq2w0p8wp59i", "equipmentName": "Laser Level"}	\N	2025-06-13 22:10:09.974
cmbvd2o9j0049pm01r7w4mv82	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmbsmtpm40015qq2wvcburire", "equipmentName": "Floor and Stone Saws"}	\N	2025-06-13 22:10:27.032
cmc9civ2p004bpm01nodgwye3	CONTACT_SUBMITTED	{"email": "wjhdata@mail.com", "contactId": "cmc9civ2m004apm013hbrqdo6", "equipment": "1.8T Excavator"}	\N	2025-06-23 17:03:49.202
cmccqasby0004np01i6jnhlqf	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-26 01:52:45.55
cmccqasc10005np0177gs6skz	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-06-26 01:52:45.553
cmccqauef000anp01rv8v2a6a	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-26 01:52:48.231
cmccqaueh000bnp01li68td2y	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "Aberdeenshire Plant Hire", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-06-26 01:52:48.233
cmcgfmoho000enp017jh71rs4	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:05:09.373
cmcgfmohq000fnp01m2fnbmr2	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "<!-- Google tag (gtag.js) --> <script async src=\\"https://www.googletagmanager.com/gtag/js?id=AW-17278911228\\"></script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:05:09.375
cmcggkt5n000inp0151te4qtc	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:31:41.723
cmcggkt5q000jnp01nbtggjiy	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "<!-- Google tag (gtag.js) --> <script async src=\\"https://www.googletagmanager.com/gtag/js?id=AW-17278911228\\"></script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:31:41.726
cmcggkuqm000mnp0104w9e0c9	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:31:43.774
cmcggltp9000qnp01t487khxc	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:32:29.086
cmcggkuqo000nnp01qw7exvvg	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "<!-- Google tag (gtag.js) --> <script async src=\\"https://www.googletagmanager.com/gtag/js?id=AW-17278911228\\"></script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:31:43.776
cmcggn1qe000unp01o9wat1hq	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:33:26.151
cmcggn1qg000vnp019bcaeyd9	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "<!-- Google tag (gtag.js) --> <script async src=\\"https://www.googletagmanager.com/gtag/js?id=AW-17278911228\\"> </script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());    gtag('config', 'AW-17278911228'); </script>", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:33:26.152
cmcggoor80012np01rvjm557h	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:34:42.644
cmcggoor90013np01zzpfwvvo	SETTINGS_UPDATED	{"enabled": false, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:34:42.645
cmcggltpb000rnp014wjytbj0	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:32:29.088
cmcggn2x1000ynp01cnoxob3e	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:33:27.685
cmcggn2x3000znp01wp08dsa2	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "<!-- Google tag (gtag.js) --> <script async src=\\"https://www.googletagmanager.com/gtag/js?id=AW-17278911228\\"> </script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());    gtag('config', 'AW-17278911228'); </script>", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:33:27.688
cmcggp1kk0016np01tetg21cn	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:34:59.253
cmcggp1kl0017np0141esuxrw	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-28 16:34:59.254
cmchc2nfz001anp01s1zb7spi	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:13:22.223
cmchc2ng1001bnp01nzgo86ii	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:13:22.225
cmchc3hhp001enp01ze9sh99k	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:14:01.166
cmchc3hhr001fnp013wm0ggg6	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "<!-- Google tag (gtag.js) --> <script async src=\\"https://www.googletagmanager.com/gtag/js?id=AW-17278911228\\"> </script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());    gtag('config', 'AW-17278911228'); </script>", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:14:01.167
cmchc4h5d001inp01zvb1e6tn	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:14:47.378
cmchc4h5f001jnp01jzo27e9l	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:14:47.379
cmchc6ahn001mnp01ws8pkttw	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:16:12.06
cmchc6aho001nnp01k3zyawmi	SETTINGS_UPDATED	{"enabled": false, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:16:12.061
cmchcbj1n001qnp01r0i740uf	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:20:16.428
cmchcbj1p001rnp012i08ovrk	SETTINGS_UPDATED	{"enabled": false, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:20:16.429
cmchcdd3e001unp01xhn9rna1	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:21:42.027
cmchcdd3h001vnp01518iskgt	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:21:42.029
cmchcfuna001ynp01bf678t0i	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:23:38.086
cmchcfunc001znp0138qk59nl	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "<!-- Google tag (gtag.js) --> <script async src=\\"https://www.googletagmanager.com/gtag/js?id=AW-17278911228\\"> </script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());    gtag('config', 'AW-17278911228'); </script>", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:23:38.089
cmchciot30022np01h44uzwk9	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:25:50.487
cmchciot50023np01mm8iuh8l	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:25:50.489
cmchczunx0026np0168zbjzzg	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:39:11.229
cmchczunz0027np01xdlkk2b5	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "AW-17278911228", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 07:39:11.231
cmci9f0wg002cnp01qrt79d5t	SETTINGS_UPDATED	{"category": "floating", "settingsChanged": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-06-29 22:46:46.865
cmci9f0wi002dnp014eo0bg9o	SETTINGS_UPDATED	{"category": "Floating Contact", "settings": {"phoneNumber": "", "phoneEnabled": false, "whatsappNumber": "+447462933406", "whatsappEnabled": true}, "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-06-29 22:46:46.866
cmci9iw58002gnp017afvoaow	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 22:49:47.325
cmci9iw5b002hnp01o48anjvg	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "G-286YSX0GFS", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 22:49:47.328
cmci9j4c8002knp01m48m2387	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 22:49:57.944
cmci9j4c9002lnp01tx9lt1q3	SETTINGS_UPDATED	{"enabled": false, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "G-286YSX0GFS", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 22:49:57.946
cmci9j9s1002onp010imr9ro2	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 22:50:04.994
cmci9j9s3002pnp01j7zk333i	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "G-286YSX0GFS\\t", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 22:50:04.995
cmcia02uy002snp011bgadghj	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:03:09.179
cmcia02v0002tnp01aauixgik	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "G-9TM6QLLJKH", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:03:09.18
cmcia53yg002wnp010844v4lh	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:07:03.881
cmcia53yj002xnp01l4djsuj1	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "G-1DM6282Q6J", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:07:03.883
cmcia89640030np01oa47gztv	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:09:30.605
cmcia89670031np01de6jej0k	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "G-JNVJCPSD25", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:09:30.607
cmciahxac0004ph015pa7ffrl	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-29 23:17:01.764
cmciahxae0005ph01i6u1sit9	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "Aberdeenshire Plant Hire", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-06-29 23:17:01.766
cmciahz8x0008ph01djnnyqn4	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:17:04.305
cmciahz8z0009ph01cgxlwig6	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "trackingId": "G-JNVJCPSD25", "updatedKeys": ["google_analytics_id", "google_analytics_enabled"]}	\N	2025-06-29 23:17:04.308
cmcib2de60004pb01nbt7ar0f	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-29 23:32:55.758
cmcib2de80005pb01r936g8o0	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "Aberdeenshire Plant Hire", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-06-29 23:32:55.76
cmcib323d0009pb01vz4xdygz	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:33:27.769
cmcib323e000apb01h9uj9zyk	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "propertyId": "11418465149", "trackingId": "G-JNVJCPSD25", "updatedKeys": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:33:27.771
cmcib81x1000epb015f4vlk5v	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:37:20.821
cmcib81x3000fpb01e4xckl6v	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "propertyId": "11418465149", "trackingId": "G-JNVJCPSD25", "updatedKeys": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:37:20.823
cmcibcna8000jpb010drwcy2g	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:40:55.136
cmcibcna9000kpb01pm6opsdg	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "propertyId": "11418465149", "trackingId": "G-JNVJCPSD25", "updatedKeys": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:40:55.138
cmcibcrnp000ppb01xfn4hmdn	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-06-29 23:41:00.806
cmcibcrnr000qpb017yhfujby	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "Aberdeenshire Plant Hire", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-06-29 23:41:00.808
cmciblri1000upb015g1pru62	SETTINGS_UPDATED	{"category": "analytics", "settingsChanged": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:48:00.505
cmciblri3000vpb017703fuor	SETTINGS_UPDATED	{"enabled": true, "category": "Analytics", "adminEmail": "info@aberdeenshireplanthire.co.uk", "propertyId": "495026766", "trackingId": "G-JNVJCPSD25", "updatedKeys": ["google_analytics_id", "google_analytics_property_id", "google_analytics_enabled"]}	\N	2025-06-29 23:48:00.508
cmcibrhzg000xpb01fj53mh5e	CONTACT_SUBMITTED	{"email": "grafiker.yunusaktas@gmail.com", "contactId": "cmcibrhze000wpb01sh950457", "equipment": "Yunus Aktasasd"}	\N	2025-06-29 23:52:28.108
cmcmk5uy90004le01y6mgh3x2	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-07-02 22:58:39.73
cmcmk5uyc0005le01shp6nisb	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "Aberdeenshire Plant Hire", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-07-02 22:58:39.733
cmcw1wtbt0001le01x7vi86cw	CONTACT_SUBMITTED	{"email": "xlimage@hotmail.co.uk", "contactId": "cmcw1wtbr0000le01sq8jrext", "equipment": "3T Excavator"}	\N	2025-07-09 14:25:26.394
cmcxiai980003le017g4rwmk1	CONTACT_SUBMITTED	{"email": "charsul22@gmail.com", "contactId": "cmcxiai950002le01drs31hrw", "equipment": "TEST"}	\N	2025-07-10 14:51:45.261
cmcxiur3i0005le01dzogogkm	CONTACT_SUBMITTED	{"email": "charsul22@gmail.com", "contactId": "cmcxiur3g0004le011j73730i", "equipment": "TEST"}	\N	2025-07-10 15:07:29.839
cmcxlp7cy0006le01vnf2s8jq	CONTACT_MARKED_AS_READ	{"submissionId": "cmcxiur3g0004le011j73730i", "submitterName": "test charley"}	\N	2025-07-10 16:27:09.826
cmcxlp90b0007le01wm1lejyi	CONTACT_MARKED_AS_READ	{"submissionId": "cmcxiai950002le01drs31hrw", "submitterName": "Charley TEST"}	\N	2025-07-10 16:27:11.964
cmcxlpafz0008le01hvq3hmaz	CONTACT_MARKED_AS_READ	{"submissionId": "cmcw1wtbr0000le01sq8jrext", "submitterName": "Mike Hanson"}	\N	2025-07-10 16:27:13.823
cmd0eno11000ale01opw22mpg	CONTACT_SUBMITTED	{"email": "umbrelladigitals@gmail.com", "contactId": "cmd0eno0y0009le01kidy0cdx", "equipment": "Micro Excavator"}	\N	2025-07-12 15:33:19.334
cmd0n2juz000cle01o853vmdn	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmd0n2juw000ble01a5asz888", "equipmentName": "timberwolf 6\\""}	\N	2025-07-12 19:28:50.699
cmd0ngwm0000lle01o17ukbij	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmd0n2juw000ble01a5asz888", "equipmentName": "timberwolf 6\\" chipper "}	\N	2025-07-12 19:40:00.409
cmd0nk22m000ule01ttxg8g38	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmd0n2juw000ble01a5asz888", "equipmentName": "timberwolf 6\\" chipper "}	\N	2025-07-12 19:42:27.455
cmd5tmli4000wle01ehgwnix9	CONTACT_SUBMITTED	{"email": "john.little@indaver.com", "contactId": "cmd5tmli1000vle013hubove9", "equipment": "800Kg Tracked Dumper"}	\N	2025-07-16 10:31:14.524
cmd8l1wij000yle01csdzndxl	CONTACT_SUBMITTED	{"email": "iangchrystie@gmail.com", "contactId": "cmd8l1wie000xle0143ac529y", "equipment": "stihl post hole auger"}	\N	2025-07-18 08:54:30.62
cmdbg7izc000zle017xixj269	CONTACT_MARKED_AS_READ	{"submissionId": "cmd8l1wie000xle0143ac529y", "submitterName": "Ian Chrystie"}	\N	2025-07-20 09:02:13.464
cmdbg7kad0010le01empgwrzt	CONTACT_MARKED_AS_READ	{"submissionId": "cmd5tmli1000vle013hubove9", "submitterName": "John Little"}	\N	2025-07-20 09:02:15.158
cmdc5wex00012le0130bjqbtk	CONTACT_SUBMITTED	{"email": "scmcintosh@hotmail.co.uk", "contactId": "cmdc5wewy0011le01aw5mok36", "equipment": "timberwolf 6\\" chipper"}	\N	2025-07-20 21:01:24.997
cmdel31lk0000le015iwmxuk9	CONTACT_MARKED_AS_READ	{"submissionId": "cmdc5wewy0011le01aw5mok36", "submitterName": "David McIntosh"}	\N	2025-07-22 13:42:00.921
cmdk1c0gw0002le01ek0pqktt	CONTACT_SUBMITTED	{"email": "elliespurrier@gmail.com", "contactId": "cmdk1c0gt0001le0111umfzrt", "equipment": "Dumper"}	\N	2025-07-26 09:15:44.097
cmdk6a3ld0004le01e9bw44iv	CONTACT_SUBMITTED	{"email": "reluafloarei@gmail.com", "contactId": "cmdk6a3lb0003le01s7scwg1j", "equipment": "stihl post hole auger"}	\N	2025-07-26 11:34:12.913
cmdmslvf20006le0151wg00ti	CONTACT_SUBMITTED	{"email": "sandy.mackay66@btinternet.com", "contactId": "cmdmslvf00005le01ce9qxhlx", "equipment": "Cement Mixers"}	\N	2025-07-28 07:34:46.094
cmdnasfag0008le01h7fplc9q	CONTACT_SUBMITTED	{"email": "trmbanff55@yahoo.com", "contactId": "cmdnasfad0007le01uz04k8d3", "equipment": "Micro Excavator"}	\N	2025-07-28 16:03:44.872
cmdo7vw81000ale0140y9c1on	CONTACT_SUBMITTED	{"email": "grantrory119@gmail.com", "contactId": "cmdo7vw7z0009le01aybe73lz", "equipment": "Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers"}	\N	2025-07-29 07:30:14.113
cmdowen80000ble01hl6nl21m	CONTACT_MARKED_AS_READ	{"submissionId": "cmdk1c0gt0001le0111umfzrt", "submitterName": "Ellie spurrier"}	\N	2025-07-29 18:56:39.697
cmdowypqc000cle01lydchqxo	CONTACT_MARKED_AS_READ	{"submissionId": "cmdnasfad0007le01uz04k8d3", "submitterName": "TOM MILLER"}	\N	2025-07-29 19:12:16.068
cmdowyr8x000dle0192r6j9dl	CONTACT_MARKED_AS_READ	{"submissionId": "cmdmslvf00005le01ce9qxhlx", "submitterName": "Alexander MACKAY"}	\N	2025-07-29 19:12:18.034
cmdowytnt000ele01bin2qv8o	CONTACT_MARKED_AS_READ	{"submissionId": "cmdk6a3lb0003le01s7scwg1j", "submitterName": "Relu Afloarei"}	\N	2025-07-29 19:12:21.162
cmdox1kf4000fle01r7cantu2	CONTACT_MARKED_AS_READ	{"submissionId": "cmdo7vw7z0009le01aybe73lz", "submitterName": "Rory Grant"}	\N	2025-07-29 19:14:29.152
cmdrhf1hg000hle01a8lln3pa	CONTACT_SUBMITTED	{"email": "tkennedy76@outlook.com", "contactId": "cmdrhf1hd000gle01m2f1w1zh", "equipment": "800Kg Tracked Dumper"}	\N	2025-07-31 14:20:22.469
cmdrmdm0f000ile015p28b7ui	CONTACT_MARKED_AS_READ	{"submissionId": "cmdrhf1hd000gle01m2f1w1zh", "submitterName": "Ian kennedy"}	\N	2025-07-31 16:39:13.84
cmdsixj57000kle01z706za3w	CONTACT_SUBMITTED	{"email": "alex.newman11@gmail.com", "contactId": "cmdsixj55000jle01t8hb7d06", "equipment": "Micro Excavator"}	\N	2025-08-01 07:50:30.955
cmdst1txi000lle018gw5pwef	CONTACT_MARKED_AS_READ	{"submissionId": "cmdsixj55000jle01t8hb7d06", "submitterName": "Alex newman"}	\N	2025-08-01 12:33:47.718
cme0gqfxb000ple01wy9ec9ew	SETTINGS_UPDATED	{"category": "contact", "settingsChanged": ["contact_email", "contact_phone", "contact_address"]}	\N	2025-08-06 21:11:10.368
cme0gqfxf000qle017mf47mah	SETTINGS_UPDATED	{"category": "Contact Information", "adminEmail": "info@aberdeenshireplanthire.co.uk", "contactInfo": {"contactEmail": "info@aberdeenshireplanthire.co.uk", "contactPhone": "", "contactAddress": ""}, "updatedKeys": ["contact_email", "contact_phone", "contact_address"]}	\N	2025-08-06 21:11:10.371
cme0gqolj000sle0146gjmx1o	CONTACT_SUBMITTED	{"email": "umbrelladigitals@gmail.com", "contactId": "cme0gqolg000rle01xcnw8nkp", "equipment": "tests"}	\N	2025-08-06 21:11:21.607
cme0gqwpl000ule01ubnmsn3b	CONTACT_SUBMITTED	{"email": "umbrelladigitals@gmail.com", "contactId": "cme0gqwpj000tle013aqovt0k", "equipment": "concrete finishing tools"}	\N	2025-08-06 21:11:32.121
cme0ho6yo0001p801max8y9n9	CONTACT_SUBMITTED	{"email": "test@example.com", "contactId": "cme0ho6yj0000p801zn9apwd4", "equipment": "Excavator"}	\N	2025-08-06 21:37:25.057
cme0iog0z0003p8018gc1j1od	CONTACT_SUBMITTED	{"email": "test@example.com", "contactId": "cme0iog0w0002p801p0snet3m", "equipment": "Excavator"}	\N	2025-08-06 22:05:36.419
cme0jwek80001rx0134x72x5i	CONTACT_SUBMITTED	{"email": "test@example.com", "contactId": "cme0jwek20000rx015vvlf1ry", "equipment": "Excavator"}	\N	2025-08-06 22:39:47.384
cme1p8rff0002rx017xqiyulr	CONTACT_MARKED_AS_READ	{"submissionId": "cme0jwek20000rx015vvlf1ry", "submitterName": "Test User"}	\N	2025-08-07 17:57:08.187
cme1p8t3g0003rx01xn0mdubj	CONTACT_MARKED_AS_READ	{"submissionId": "cme0iog0w0002p801p0snet3m", "submitterName": "Test User"}	\N	2025-08-07 17:57:10.349
cme1p8uvz0004rx018lbl2oc8	CONTACT_MARKED_AS_READ	{"submissionId": "cme0ho6yj0000p801zn9apwd4", "submitterName": "Test User"}	\N	2025-08-07 17:57:12.672
cme1p8wkt0005rx010007152h	CONTACT_MARKED_AS_READ	{"submissionId": "cme0gqwpj000tle013aqovt0k", "submitterName": "Yunus Aktaş"}	\N	2025-08-07 17:57:14.861
cme1p8yhx0006rx01fac5k9as	CONTACT_MARKED_AS_READ	{"submissionId": "cme0gqolg000rle01xcnw8nkp", "submitterName": "Yunus Aktaş"}	\N	2025-08-07 17:57:17.35
cme2ynuij0008rx01pec1jj12	CONTACT_SUBMITTED	{"email": "zoewaite1@gmail.com", "contactId": "cme2ynuig0007rx01ghcdhm89", "equipment": "All"}	\N	2025-08-08 15:08:34.748
cme2zy52e0009rx01drcdnhv2	CONTACT_MARKED_AS_READ	{"submissionId": "cme2ynuig0007rx01ghcdhm89", "submitterName": "Zoe Waite"}	\N	2025-08-08 15:44:34.599
cme326xsu000brx01ze4mkdzz	CONTACT_SUBMITTED	{"email": "umbrelladigitals@gmail.com", "contactId": "cme326xss000arx01rtwca5co", "equipment": "General Enquiry"}	\N	2025-08-08 16:47:24.319
cme4ahftm000crx01ylsr5fh8	CONTACT_MARKED_AS_READ	{"submissionId": "cme326xss000arx01rtwca5co", "submitterName": "Yunus Aktaş"}	\N	2025-08-09 13:27:17.339
cme5wnvub000erx016tgwsql1	CONTACT_SUBMITTED	{"email": "drumbulg@gmail.com", "contactId": "cme5wnvu7000drx01xdz4cdoa", "equipment": "timberwolf 6\\" chipper"}	\N	2025-08-10 16:35:55.763
cme7jqo52000grx01ipf8raza	CONTACT_SUBMITTED	{"email": "grafiker.yunusaktas@gmail.com", "contactId": "cme7jqo50000frx01n40e23o6", "equipment": "General Enquiry"}	\N	2025-08-11 20:09:43.095
cme7kcf2p000lrx01x89zadfk	SETTINGS_UPDATED	{"category": "general", "settingsChanged": ["site_name", "site_description", "site_logo", "site_logo_size"]}	\N	2025-08-11 20:26:37.777
cme7kcf2q000mrx012vpeydch	SETTINGS_UPDATED	{"category": "General", "siteLogo": "https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png", "siteName": "Aberdeenshire Plant Hire", "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["site_name", "site_description", "site_logo", "site_logo_size"], "siteLogoSize": "large", "siteDescription": ""}	\N	2025-08-11 20:26:37.779
cme7kctvr000orx01xak3jrj2	CONTACT_SUBMITTED	{"email": "umbrelladigitals@gmail.com", "contactId": "cme7kctvo000nrx010eyg5rq3", "equipment": "concrete finishing tools"}	\N	2025-08-11 20:26:56.967
cme89lldn000qrx01hsszhib9	CONTACT_SUBMITTED	{"email": "emails@miracleventures.co.uk", "contactId": "cme89lldk000prx01i46c8zvh", "equipment": "3t digger, 3t dumper, cement mixer"}	\N	2025-08-12 08:13:36.251
cme9rm1zv000srx01kwut9u9a	CONTACT_SUBMITTED	{"email": "john.grubb@outlook.com", "contactId": "cme9rm1zs000rrx01silki2t1", "equipment": "Micro Excavator"}	\N	2025-08-13 09:25:37.051
cme9xbq60000urx01xjh5pgjf	CONTACT_SUBMITTED	{"email": "thatmo1@googlemail.com", "contactId": "cme9xbq5x000trx01wgcuoor6", "equipment": "Mini digger"}	\N	2025-08-13 12:05:32.857
cme9zqfx9000wrx01ghqo1k40	CONTACT_SUBMITTED	{"email": "mcintoshdean56@gmail.con", "contactId": "cme9zqfx5000vrx01wy9jvmn0", "equipment": "timberwolf 6\\" chipper"}	\N	2025-08-13 13:12:58.653
cmeabckjq000xrx01s7qbn7so	CONTACT_MARKED_AS_READ	{"submissionId": "cme7jqo50000frx01n40e23o6", "submitterName": "Yunus Aktas"}	\N	2025-08-13 18:38:06.855
cmeabclgk000yrx0107uxnmrj	CONTACT_MARKED_AS_READ	{"submissionId": "cme7kctvo000nrx010eyg5rq3", "submitterName": "Yunus Aktaş"}	\N	2025-08-13 18:38:08.037
cmeabcned000zrx01gghdlgj1	CONTACT_MARKED_AS_READ	{"submissionId": "cme89lldk000prx01i46c8zvh", "submitterName": "Peter Jones"}	\N	2025-08-13 18:38:10.549
cmeabcpyq0010rx0160qdaah1	CONTACT_MARKED_AS_READ	{"submissionId": "cme9rm1zs000rrx01silki2t1", "submitterName": "John grubb"}	\N	2025-08-13 18:38:13.874
cmeabcr0m0011rx01bf6qjpw1	CONTACT_MARKED_AS_READ	{"submissionId": "cme9xbq5x000trx01wgcuoor6", "submitterName": "James Morris"}	\N	2025-08-13 18:38:15.239
cmeabctu50012rx01rv7x5x3p	CONTACT_MARKED_AS_READ	{"submissionId": "cme9zqfx5000vrx01wy9jvmn0", "submitterName": "Dean mcintosh"}	\N	2025-08-13 18:38:18.894
cmeabd0rt0013rx01xphsifg6	CONTACT_MARKED_AS_READ	{"submissionId": "cme5wnvu7000drx01xdz4cdoa", "submitterName": "Shona Childs"}	\N	2025-08-13 18:38:27.881
cmebkisn40015rx01l6pbr2er	CONTACT_SUBMITTED	{"email": "jamesmb62@hotmail.com", "contactId": "cmebkisn00014rx01sqyj35mb", "equipment": "Petrol auger"}	\N	2025-08-14 15:42:40
cmed1cql90016rx011r8u8d1b	CONTACT_MARKED_AS_READ	{"submissionId": "cmebkisn00014rx01sqyj35mb", "submitterName": "James Buchan"}	\N	2025-08-15 16:21:37.053
cmedxzjx50018rx01t0j7f3c0	CONTACT_SUBMITTED	{"email": "mcgee8080@icloud.com", "contactId": "cmedxzjx30017rx01ri8075ed", "equipment": "Floor sander"}	\N	2025-08-16 07:35:09.209
cmee5jane001arx019iptu2nx	CONTACT_SUBMITTED	{"email": "lauraseymour25@gmail.com", "contactId": "cmee5janc0019rx01mrmu2suz", "equipment": "Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers"}	\N	2025-08-16 11:06:27.627
cmee8dn7i001crx01stb68v3a	CONTACT_SUBMITTED	{"email": "kenregan@ymail.com", "contactId": "cmee8dn7f001brx017q29vqxn", "equipment": "Mini barrow."}	\N	2025-08-16 12:26:02.814
cmegrvdl6001erx01gy7y82zm	CONTACT_SUBMITTED	{"email": "mcdougallad@googlemail.com", "contactId": "cmegrvdl2001drx01n1x4kd2r", "equipment": "Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers"}	\N	2025-08-18 07:07:15.21
cmei39lhl001grx01c97jg6nh	CONTACT_SUBMITTED	{"email": "andrew.reid84@yahoo.co.uk", "contactId": "cmei39lhj001frx01wvragbsw", "equipment": "1.8T Excavator"}	\N	2025-08-19 05:14:00.585
cmeibv078001irx01dfc3ehwa	CONTACT_SUBMITTED	{"email": "newks48@hotmail.com", "contactId": "cmeibv074001hrx01js9rmrtf", "equipment": "One tone electric mobile winch"}	\N	2025-08-19 09:14:36.356
cmejulx2o001krx01x8aro0u3	CONTACT_SUBMITTED	{"email": "peter@pvproperty.co.uk", "contactId": "cmejulx2l001jrx01r0tirose", "equipment": "1.8T Excavator"}	\N	2025-08-20 10:47:11.28
cmeldu5dv001mrx0169uxi9eb	CONTACT_SUBMITTED	{"email": "jkhill6979@gmail.com", "contactId": "cmeldu5ds001lrx01lkhl9e6b", "equipment": "timberwolf 6\\" chipper"}	\N	2025-08-21 12:33:14.179
cmeldusai001orx01swn5sv5e	CONTACT_SUBMITTED	{"email": "jkhill6979@gmail.com", "contactId": "cmeldusag001nrx01vvhuq3gq", "equipment": "timberwolf 6\\" chipper"}	\N	2025-08-21 12:33:43.866
cmenyeux0001prx015o2fu2qz	CONTACT_MARKED_AS_READ	{"submissionId": "cmeibv074001hrx01js9rmrtf", "submitterName": "Neil Newcombe"}	\N	2025-08-23 07:44:45.061
cmenyevss001qrx01iyns5gvo	CONTACT_MARKED_AS_READ	{"submissionId": "cmejulx2l001jrx01r0tirose", "submitterName": "Peter Stewart"}	\N	2025-08-23 07:44:46.205
cmenyf06r001rrx01hd46ajze	CONTACT_MARKED_AS_READ	{"submissionId": "cmei39lhj001frx01wvragbsw", "submitterName": "Andrew Reid"}	\N	2025-08-23 07:44:51.892
cmenyf3tn001srx01wefgd5oy	CONTACT_MARKED_AS_READ	{"submissionId": "cmegrvdl2001drx01n1x4kd2r", "submitterName": "Aaron McDougall"}	\N	2025-08-23 07:44:56.603
cmenyf8bx001trx01a9jxe0k4	CONTACT_MARKED_AS_READ	{"submissionId": "cmee8dn7f001brx017q29vqxn", "submitterName": "Ken"}	\N	2025-08-23 07:45:02.446
cmenyfd8z001urx0156ot5vyq	CONTACT_MARKED_AS_READ	{"submissionId": "cmee5janc0019rx01mrmu2suz", "submitterName": "Laura Walton"}	\N	2025-08-23 07:45:08.819
cmenyfg36001vrx010xlihdf1	CONTACT_MARKED_AS_READ	{"submissionId": "cmedxzjx30017rx01ri8075ed", "submitterName": "John Mcgrory"}	\N	2025-08-23 07:45:12.498
cmenyfk51001wrx01sye3mx59	CONTACT_MARKED_AS_READ	{"submissionId": "cmeldu5ds001lrx01lkhl9e6b", "submitterName": "Jason P Hill"}	\N	2025-08-23 07:45:17.749
cmenyfmeu001xrx01bmzqoeur	CONTACT_MARKED_AS_READ	{"submissionId": "cmeldusag001nrx01vvhuq3gq", "submitterName": "Jason P Hill"}	\N	2025-08-23 07:45:20.695
cmepir67r001zrx011u9nmjin	CONTACT_SUBMITTED	{"email": "rebeccacoutts@outlook.com", "contactId": "cmepir67o001yrx01n20ft023", "equipment": "3T dumper, 1.8T excavator + log splitter"}	\N	2025-08-24 10:01:58.072
cmepu23ng0020rx01gpbg4y7l	CONTACT_MARKED_AS_READ	{"submissionId": "cmepir67o001yrx01n20ft023", "submitterName": "Rebecca Coutts"}	\N	2025-08-24 15:18:23.741
cmepucuks0026rx01h1ojo4g6	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmepucukl0021rx01idnubi22", "equipmentName": "petrol stump grinder"}	\N	2025-08-24 15:26:45.197
cmer3shlc0028rx01dx65drx9	CONTACT_SUBMITTED	{"email": "billytait1988@gmail.com", "contactId": "cmer3shl80027rx01c4myj9wo", "equipment": "timberwolf 6\\" chipper"}	\N	2025-08-25 12:38:37.584
cmesf0nld002arx01ni2wunzx	CONTACT_SUBMITTED	{"email": "bkee65@yahoo.co.uk", "contactId": "cmesf0nla0029rx01x7lf3acq", "equipment": "1.8T Excavator"}	\N	2025-08-26 10:40:40.562
cmeuhsmnt002crx012c70oib5	CONTACT_SUBMITTED	{"email": "scottcummings1970@hotmail.co.uk", "contactId": "cmeuhsmnr002brx01ccfikshp", "equipment": "Turf cutter"}	\N	2025-08-27 21:33:57.306
cmewfvvqc002erx016kibg0p2	CONTACT_SUBMITTED	{"email": "johnodwyer14@hotmail.com", "contactId": "cmewfvvqa002drx01ntw6hp87", "equipment": "Lawn Mower"}	\N	2025-08-29 06:16:02.149
cmewgty7u002grx01kxyo4imi	CONTACT_SUBMITTED	{"email": "pamelagoodlad@hotmail.com", "contactId": "cmewgty7r002frx01xigcfrrt", "equipment": "Micro Excavator"}	\N	2025-08-29 06:42:31.675
cmezjex08002irx01hnoszezp	CONTACT_SUBMITTED	{"email": "mrjstronach@gmail.com", "contactId": "cmezjex05002hrx01baajh2bd", "equipment": "petrol stump grinder"}	\N	2025-08-31 10:18:07.64
cmf0v6xua002krx013llw7t3w	CONTACT_SUBMITTED	{"email": "mastermarc2013@gmail.com", "contactId": "cmf0v6xu6002jrx01iflbvj75", "equipment": "Micro Excavator"}	\N	2025-09-01 08:35:37.042
cmf2rk14d002mrx01d2sc8wd7	CONTACT_SUBMITTED	{"email": "bkee65@yahoo.co.uk", "contactId": "cmf2rk14a002lrx01bnzu9vyg", "equipment": "1.8T Excavator"}	\N	2025-09-02 16:29:21.709
cmf5g9vo5002orx011w9ftqjv	CONTACT_SUBMITTED	{"email": "craig.grassick@3tglobal.com", "contactId": "cmf5g9vo3002nrx01mrwmc7yd", "equipment": "3T Excavator"}	\N	2025-09-04 13:36:50.838
cmf5t1ku3002qrx01ysbb5r6e	CONTACT_SUBMITTED	{"email": "bydand04@hotmail.com", "contactId": "cmf5t1ku1002prx01h78moka3", "equipment": "A Cement Mixer"}	\N	2025-09-04 19:34:18.555
cmf5uf8yx002srx01ngy5gghl	CONTACT_SUBMITTED	{"email": "dr.dan.allen1995@gmail.com", "contactId": "cmf5uf8yu002rrx01syc1nmpm", "equipment": "Log Splitter Vertical and Horizontal Use"}	\N	2025-09-04 20:12:55.977
cmf8do5yt002urx01naoj5ns2	CONTACT_SUBMITTED	{"email": "robertpgdavidson@gmail.com", "contactId": "cmf8do5yr002trx018idl0yg3", "equipment": "Micro Excavator"}	\N	2025-09-06 14:47:17.046
cmf9mlq7p002wrx01z9bsmxe9	CONTACT_SUBMITTED	{"email": "geoff.doyle@hotmail.co.uk", "contactId": "cmf9mlq7n002vrx01m09bfi48", "equipment": "Concrete mixer & post hole borer"}	\N	2025-09-07 11:45:06.038
cmf9moeft002yrx01mevobpqx	CONTACT_SUBMITTED	{"email": "geoff.doyle@hotmail.co.uk", "contactId": "cmf9moefq002xrx01bqhpqpt6", "equipment": "Concrete mixer & post hole borer"}	\N	2025-09-07 11:47:10.745
cmfaxykb20030rx01ud3od1ue	CONTACT_SUBMITTED	{"email": "bigstuno176@yahoo.co.uk", "contactId": "cmfaxykaz002zrx015q6cqphy", "equipment": "stihl post hole auger"}	\N	2025-09-08 09:50:46.862
cmfpeh22h0032rx01lxtxow7p	CONTACT_SUBMITTED	{"email": "benstrachan92@hotmail.co.uk", "contactId": "cmfpeh22c0031rx0136inq5rd", "equipment": "SDS Drills and Breakers"}	\N	2025-09-18 12:41:50.009
cmfxr2ey50034rx0172pv3fsf	CONTACT_SUBMITTED	{"email": "ewanjamieson@hotmail.co.uk", "contactId": "cmfxr2ey00033rx01kn3qypl0", "equipment": "1.8T Excavator"}	\N	2025-09-24 08:56:31.277
cmg0pyk890036rx01sbm0tuum	CONTACT_SUBMITTED	{"email": "ibbyhmh741@gmail.com", "contactId": "cmg0pyk870035rx01sg7lq4gh", "equipment": "Floor and Stone Saws"}	\N	2025-09-26 10:48:50.41
cmg24ac0b0038rx01fs7w2bow	CONTACT_SUBMITTED	{"email": "ivornicol@hotmail.com", "contactId": "cmg24ac090037rx010ef77sat", "equipment": "timberwolf 6\\" chipper"}	\N	2025-09-27 10:17:40.428
cmg59yfv1003arx01duj0kig5	CONTACT_SUBMITTED	{"email": "brooner22@yahoo.co.uk", "contactId": "cmg59yfuy0039rx01plpcprsz", "equipment": "Micro Excavator"}	\N	2025-09-29 15:19:41.773
cmg5eiogx003crx01uhrc5zq5	CONTACT_SUBMITTED	{"email": "dwardbrook@hotmail.com", "contactId": "cmg5eiogu003brx01pg6x8qlw", "equipment": "wood chipper"}	\N	2025-09-29 17:27:24.513
cmg80y3z0003erx016zx2dqfr	CONTACT_SUBMITTED	{"email": "couttsgs@outlook.com", "contactId": "cmg80y3yx003drx01vem96w0u", "equipment": "Cement Mixers"}	\N	2025-10-01 13:30:48.349
cmg9gfjab003grx01gugd5jf1	CONTACT_SUBMITTED	{"email": "bruce505@hotmail.co.uk", "contactId": "cmg9gfja9003frx01jkgkx5mr", "equipment": "Rollers 800mm and 1200mm"}	\N	2025-10-02 13:32:01.764
cmg9hm7bc003irx01zskbcsxn	CONTACT_SUBMITTED	{"email": "smacdearmid82@gmail.com", "contactId": "cmg9hm7b9003hrx011lnlauf3", "equipment": "800Kg Tracked Dumper"}	\N	2025-10-02 14:05:12.456
cmgb38ms6003jrx01o5imt4h4	CONTACT_MARKED_AS_READ	{"submissionId": "cmg9hm7b9003hrx011lnlauf3", "submitterName": "Stewart MacDearmid"}	\N	2025-10-03 16:58:17.046
cmgb38rbp003krx010ckvwh54	CONTACT_MARKED_AS_READ	{"submissionId": "cmg9gfja9003frx01jkgkx5mr", "submitterName": "Martin bruce"}	\N	2025-10-03 16:58:22.933
cmgb38wt1003lrx011ildrhh0	CONTACT_MARKED_AS_READ	{"submissionId": "cmg80y3yx003drx01vem96w0u", "submitterName": "Gareth Coutts"}	\N	2025-10-03 16:58:30.037
cmgb39197003mrx01zccjck7b	CONTACT_MARKED_AS_READ	{"submissionId": "cmg5eiogu003brx01pg6x8qlw", "submitterName": "Donna Ward"}	\N	2025-10-03 16:58:35.803
cmgb396l7003nrx010qw0x4c7	CONTACT_MARKED_AS_READ	{"submissionId": "cmg59yfuy0039rx01plpcprsz", "submitterName": "Craig brown"}	\N	2025-10-03 16:58:42.715
cmgb39ajj003orx01dnps7wgr	CONTACT_MARKED_AS_READ	{"submissionId": "cmg24ac090037rx010ef77sat", "submitterName": "Ivor Nicol"}	\N	2025-10-03 16:58:47.84
cmgb39d3j003prx01dveon855	CONTACT_MARKED_AS_READ	{"submissionId": "cmg0pyk870035rx01sg7lq4gh", "submitterName": "Isobel Hindmarch"}	\N	2025-10-03 16:58:51.152
cmgb39pk3003qrx01fvbi3k90	CONTACT_MARKED_AS_READ	{"submissionId": "cmfxr2ey00033rx01kn3qypl0", "submitterName": "Ewan Jamieson"}	\N	2025-10-03 16:59:07.299
cmgb39um5003rrx01u15ddkow	CONTACT_MARKED_AS_READ	{"submissionId": "cmfpeh22c0031rx0136inq5rd", "submitterName": "Ben Strachan"}	\N	2025-10-03 16:59:13.853
cmgb3a1g8003srx01hr1yvrsk	CONTACT_MARKED_AS_READ	{"submissionId": "cmfaxykaz002zrx015q6cqphy", "submitterName": "STUART MONTGOMERY"}	\N	2025-10-03 16:59:22.712
cmgb3a2yr003trx01k3fbdngo	CONTACT_MARKED_AS_READ	{"submissionId": "cmf9moefq002xrx01bqhpqpt6", "submitterName": "Geoff Doyle"}	\N	2025-10-03 16:59:24.676
cmgb3a54e003urx01u2bvz80p	CONTACT_MARKED_AS_READ	{"submissionId": "cmf9mlq7n002vrx01m09bfi48", "submitterName": "Geoffrey Doyle"}	\N	2025-10-03 16:59:27.47
cmgb3aep0003vrx013e94l819	CONTACT_MARKED_AS_READ	{"submissionId": "cmf8do5yr002trx018idl0yg3", "submitterName": "Robert Davidson"}	\N	2025-10-03 16:59:39.876
cmgb3aigf003wrx015nqptd00	CONTACT_MARKED_AS_READ	{"submissionId": "cmf5uf8yu002rrx01syc1nmpm", "submitterName": "Dan allen"}	\N	2025-10-03 16:59:44.752
cmgb3ajue003xrx01iznc9ufc	CONTACT_MARKED_AS_READ	{"submissionId": "cmf5t1ku1002prx01h78moka3", "submitterName": "Brian Conn"}	\N	2025-10-03 16:59:46.55
cmgb3alqe003yrx01r5ebtwod	CONTACT_MARKED_AS_READ	{"submissionId": "cmf5g9vo3002nrx01mrwmc7yd", "submitterName": "Craig Grassick"}	\N	2025-10-03 16:59:48.998
cmgb3anty003zrx01rg7v90s2	CONTACT_MARKED_AS_READ	{"submissionId": "cmf2rk14a002lrx01bnzu9vyg", "submitterName": "Bryan Kee"}	\N	2025-10-03 16:59:51.718
cmgb3at4e0040rx01fn8gu3zv	CONTACT_MARKED_AS_READ	{"submissionId": "cmf0v6xu6002jrx01iflbvj75", "submitterName": "Marc"}	\N	2025-10-03 16:59:58.575
cmgb3av740041rx01w2updrlt	CONTACT_MARKED_AS_READ	{"submissionId": "cmezjex05002hrx01baajh2bd", "submitterName": "John stronach"}	\N	2025-10-03 17:00:01.265
cmgb3awlq0042rx01b7ka62m2	CONTACT_MARKED_AS_READ	{"submissionId": "cmewgty7r002frx01xigcfrrt", "submitterName": "Pamela Goodlad"}	\N	2025-10-03 17:00:03.087
cmgb3b19y0045rx01dkhy9vrc	CONTACT_MARKED_AS_READ	{"submissionId": "cmesf0nla0029rx01x7lf3acq", "submitterName": "Bryan Kee"}	\N	2025-10-03 17:00:09.143
cmgb3b3s70046rx01d1rx61h6	CONTACT_MARKED_AS_READ	{"submissionId": "cmer3shl80027rx01c4myj9wo", "submitterName": "William Tait"}	\N	2025-10-03 17:00:12.392
cmgb3ay660043rx01ftq1rbq4	CONTACT_MARKED_AS_READ	{"submissionId": "cmewfvvqa002drx01ntw6hp87", "submitterName": "John O’Dwyer"}	\N	2025-10-03 17:00:05.118
cmgb3b01k0044rx01wa8bzktz	CONTACT_MARKED_AS_READ	{"submissionId": "cmeuhsmnr002brx01ccfikshp", "submitterName": "Scott Cummings"}	\N	2025-10-03 17:00:07.545
cmgc0q4gi0048rx01sc0hro9d	CONTACT_SUBMITTED	{"email": "jjwvane@gmail.com", "contactId": "cmgc0q4gg0047rx012utkdcb0", "equipment": "1.8T Excavator"}	\N	2025-10-04 08:35:40.435
cmgl7fze9004arx01nc06fc39	CONTACT_SUBMITTED	{"email": "jenniclark10@aol.com", "contactId": "cmgl7fze60049rx01yy5ktd9s", "equipment": "50mm or 75mm centrifugal water pump"}	\N	2025-10-10 18:53:40.209
cmgno8yfe004crx01ux75hj2v	CONTACT_SUBMITTED	{"email": "fraserford86@gmail.com", "contactId": "cmgno8yfb004brx01sqjp7zjv", "equipment": "Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers"}	\N	2025-10-12 12:19:38.187
cmgplsk2x004erx01iq3g93ty	CONTACT_SUBMITTED	{"email": "lmetcalf1993@hotmail.com", "contactId": "cmgplsk2u004drx01t1jjxwj2", "equipment": "petrol stump grinder"}	\N	2025-10-13 20:46:26.217
cmgtdm6if004grx014mums77h	CONTACT_SUBMITTED	{"email": "colin.sinclair@cyanrenewables.com", "contactId": "cmgtdm6ic004frx01wpzfbpht", "equipment": "Concrete cutter"}	\N	2025-10-16 12:08:36.471
cmgw4df4x004irx012a6uhxn0	CONTACT_SUBMITTED	{"email": "cynthiafultonc22@gmail.com", "contactId": "cmgw4df4v004hrx01stnqdv9y", "equipment": "I can improve your SEO traffic by 3x"}	\N	2025-10-18 10:13:09.729
cmgyti5sn004krx01bwumquwg	CONTACT_SUBMITTED	{"email": "faithnmackenzie@gmail.com", "contactId": "cmgyti5sj004jrx01ubn2nsp4", "equipment": "Floor sander"}	\N	2025-10-20 07:32:13.656
cmh0essbj004mrx014ox7f158	CONTACT_SUBMITTED	{"email": "noel76@hotmail.co.uk", "contactId": "cmh0essbg004lrx01kgn1t8pf", "equipment": "Whacker plate"}	\N	2025-10-21 10:16:07.519
cmh0jk8qz004orx015yaonktq	CONTACT_SUBMITTED	{"email": "grant76.mchardy@gmail.com", "contactId": "cmh0jk8qx004nrx01f188my7s", "equipment": "Pressure Washer with Attachments"}	\N	2025-10-21 12:29:26.987
cmh0rowbe004qrx01hruwjum9	CONTACT_SUBMITTED	{"email": "info@sweetdonsidecabins.com", "contactId": "cmh0rowbb004prx019juij6zl", "equipment": "1.8T Excavator"}	\N	2025-10-21 16:17:01.083
cmh1r0t8o004srx014g9tlffk	CONTACT_SUBMITTED	{"email": "davidcbarron1@gmail.com", "contactId": "cmh1r0t8k004rrx01bgs178uc", "equipment": "timberwolf 6\\" chipper"}	\N	2025-10-22 08:46:03.529
cmh36ahck004urx010n1v10up	CONTACT_SUBMITTED	{"email": "jackieroy1@yahoo.com", "contactId": "cmh36ahch004trx019dbv9xfm", "equipment": "1.8T Excavator"}	\N	2025-10-23 08:41:15.093
cmh8yfwh5004wrx015jsxnozv	CONTACT_SUBMITTED	{"email": "fitliken@hotmail.com", "contactId": "cmh8yfwh1004vrx01wosm5068", "equipment": "Diesel mixer"}	\N	2025-10-27 09:48:08.106
cmhccs9sk004yrx01h4j61orp	CONTACT_SUBMITTED	{"email": "anthonyormrod@yahoo.co.uk", "contactId": "cmhccs9sh004xrx01ckuudtfp", "equipment": "3T Excavator"}	\N	2025-10-29 18:52:58.388
cmhhswazq0050rx01yblwg0rt	CONTACT_SUBMITTED	{"email": "royf18@hotmail.com", "contactId": "cmhhswazm004zrx01mubc5830", "equipment": "timberwolf 6\\" chipper"}	\N	2025-11-02 14:22:51.303
cmhm7nyru0052rx01my9tf703	CONTACT_SUBMITTED	{"email": "goldie.rob@gmail.com", "contactId": "cmhm7nyrr0051rx01u19kfmlr", "equipment": "petrol stump grinder"}	\N	2025-11-05 16:27:21.163
cmhnfw7710054rx01civq9bm9	CONTACT_SUBMITTED	{"email": "bryanforbes_1990@hotmail.co.uk", "contactId": "cmhnfw76y0053rx01vli9or5h", "equipment": "1.8T Excavator"}	\N	2025-11-06 13:05:28.429
cmhrad9lo0056rx01skm323t0	CONTACT_SUBMITTED	{"email": "mike@linganbo.co.uk", "contactId": "cmhrad9lj0055rx01ygame3d8", "equipment": "Portable conveyor belt system for soil transport"}	\N	2025-11-09 05:41:51.708
cmi3c09f50058rx016sr7po70	CONTACT_SUBMITTED	{"email": "sheliagarland@sky.com", "contactId": "cmi3c09f10057rx012ui7omd9", "equipment": "1.8T Excavator"}	\N	2025-11-17 16:00:58.289
cmi3na0of005arx01xf65noxp	CONTACT_SUBMITTED	{"email": "matty.booth92@googlemail.com", "contactId": "cmi3na0ob0059rx01g65v8h86", "equipment": "Trench Rammer and Vibrating Plate"}	\N	2025-11-17 21:16:29.296
cmiabeidf005crx0142461b8m	CONTACT_SUBMITTED	{"email": "babsboogiewoogie@hotmail.co.uk", "contactId": "cmiabeidc005brx01sp1hyzvm", "equipment": "Lifting"}	\N	2025-11-22 13:18:26.691
cmibro0p6005drx01gwbbnart	CONTACT_MARKED_AS_READ	{"submissionId": "cmiabeidc005brx01sp1hyzvm", "submitterName": "Barbara Henderson"}	\N	2025-11-23 13:41:30.378
cmibro4f7005erx017pykeedr	CONTACT_MARKED_AS_READ	{"submissionId": "cmi3na0ob0059rx01g65v8h86", "submitterName": "matthew booth"}	\N	2025-11-23 13:41:35.204
cmibro73k005frx01tehgxfzb	CONTACT_MARKED_AS_READ	{"submissionId": "cmi3c09f10057rx012ui7omd9", "submitterName": "Sheila Garland"}	\N	2025-11-23 13:41:38.672
cmibro8r0005grx01xsjgg40t	CONTACT_MARKED_AS_READ	{"submissionId": "cmhrad9lj0055rx01ygame3d8", "submitterName": "Mike morgan"}	\N	2025-11-23 13:41:40.813
cmibroa23005hrx0176iagxib	CONTACT_MARKED_AS_READ	{"submissionId": "cmhnfw76y0053rx01vli9or5h", "submitterName": "Bryan"}	\N	2025-11-23 13:41:42.508
cmibrobjt005irx01yajw920w	CONTACT_MARKED_AS_READ	{"submissionId": "cmhm7nyrr0051rx01u19kfmlr", "submitterName": "ROB GOLDIE"}	\N	2025-11-23 13:41:44.441
cmibrocj5005jrx01d84eyu9t	CONTACT_MARKED_AS_READ	{"submissionId": "cmhhswazm004zrx01mubc5830", "submitterName": "Roy Fairhead"}	\N	2025-11-23 13:41:45.714
cmibrokdx005krx01hy9nvafi	CONTACT_MARKED_AS_READ	{"submissionId": "cmhccs9sh004xrx01ckuudtfp", "submitterName": "Anthony Ormrod"}	\N	2025-11-23 13:41:55.893
cmibrolm7005lrx01yoohezoz	CONTACT_MARKED_AS_READ	{"submissionId": "cmh8yfwh1004vrx01wosm5068", "submitterName": "Paul Hourston"}	\N	2025-11-23 13:41:57.487
cmibronbu005mrx01otz2fv03	CONTACT_MARKED_AS_READ	{"submissionId": "cmh36ahch004trx019dbv9xfm", "submitterName": "Jacqueline Roy"}	\N	2025-11-23 13:41:59.707
cmibrooob005nrx01fv9n3t6m	CONTACT_MARKED_AS_READ	{"submissionId": "cmh1r0t8k004rrx01bgs178uc", "submitterName": "David Barron"}	\N	2025-11-23 13:42:01.452
cmibroq1k005orx01hzomsfke	CONTACT_MARKED_AS_READ	{"submissionId": "cmh0rowbb004prx019juij6zl", "submitterName": "Elizabeth McNeill"}	\N	2025-11-23 13:42:03.224
cmibroqxe005prx01w90a8zub	CONTACT_MARKED_AS_READ	{"submissionId": "cmh0jk8qx004nrx01f188my7s", "submitterName": "Grant mchardy"}	\N	2025-11-23 13:42:04.37
cmibrosi8005qrx01mbnwl60t	CONTACT_MARKED_AS_READ	{"submissionId": "cmh0essbg004lrx01kgn1t8pf", "submitterName": "Noel Johnson"}	\N	2025-11-23 13:42:06.416
cmibrotnz005rrx01erp63dtx	CONTACT_MARKED_AS_READ	{"submissionId": "cmgyti5sj004jrx01ubn2nsp4", "submitterName": "Faith Mackenzie"}	\N	2025-11-23 13:42:07.92
cmibrov6i005srx01eb4cnbs0	CONTACT_MARKED_AS_READ	{"submissionId": "cmgw4df4v004hrx01stnqdv9y", "submitterName": "Cynthia Fulton"}	\N	2025-11-23 13:42:09.883
cmibrowmb005trx01ykefqlma	CONTACT_MARKED_AS_READ	{"submissionId": "cmgtdm6ic004frx01wpzfbpht", "submitterName": "Colin Sinclair"}	\N	2025-11-23 13:42:11.748
cmibroxip005urx015gptl8av	CONTACT_MARKED_AS_READ	{"submissionId": "cmgplsk2u004drx01t1jjxwj2", "submitterName": "Lewis metcalf"}	\N	2025-11-23 13:42:12.914
cmibrozf8005vrx01ys54ozga	CONTACT_MARKED_AS_READ	{"submissionId": "cmgno8yfb004brx01sqjp7zjv", "submitterName": "Fraser"}	\N	2025-11-23 13:42:15.38
cmibrp396005wrx01kcf68b1g	CONTACT_MARKED_AS_READ	{"submissionId": "cmgl7fze60049rx01yy5ktd9s", "submitterName": "Alastair Clark"}	\N	2025-11-23 13:42:20.346
cmibrp4c4005xrx01w4t1r8vn	CONTACT_MARKED_AS_READ	{"submissionId": "cmgc0q4gg0047rx012utkdcb0", "submitterName": "Jacoba van engelen"}	\N	2025-11-23 13:42:21.748
cmibrxctq0060rx01qtyv6nxx	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpn1001qqq2w0ax6z7ia", "equipmentName": "1 Ton High Tip Dumper"}	\N	2025-11-23 13:48:45.998
cmibrxn9a0063rx01nuw6o2ix	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpmi001eqq2wk7cuwyts", "equipmentName": "Micro Excavator"}	\N	2025-11-23 13:48:59.518
cmibry41s0066rx0118cs1i9f	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpm90018qq2w1vd2xnb1", "equipmentName": "Lighting Tower and Generator"}	\N	2025-11-23 13:49:21.28
cmibs08yb0069rx01pljuqqr2	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpmr001kqq2wa64ztoh6", "equipmentName": "3T Excavator"}	\N	2025-11-23 13:51:00.948
cmibs0rki006crx01p986wsws	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpju0005qq2wrq76v1x8", "equipmentName": "1T High Tip Dumper"}	\N	2025-11-23 13:51:25.074
cmibsfq6l006jrx01lgcgqoe8	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibsfq6c006erx0101b5kvmn", "equipmentName": "quad bike with flail mower"}	\N	2025-11-23 14:03:03.117
cmibsizse006mrx01an0yv2hx	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 0, "equipmentId": "cmibsizsd006lrx01m78tooha", "equipmentName": "alloy"}	\N	2025-11-23 14:05:35.535
cmibsmhw6006rrx01ik0034sy	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmibsizsd006lrx01m78tooha", "equipmentName": "alloy scaffold tower "}	\N	2025-11-23 14:08:18.966
cmibsnyym0070rx01h7izreoh	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmd0n2juw000ble01a5asz888", "equipmentName": "timberwolf 6\\" chipper "}	\N	2025-11-23 14:09:27.742
cmibucjox0075rx0113knh8qy	SETTINGS_UPDATED	{"category": "floating", "settingsChanged": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-11-23 14:56:33.969
cmibucjoz0076rx01kqql6v0i	SETTINGS_UPDATED	{"category": "Floating Contact", "settings": {"phoneNumber": "07312110885", "phoneEnabled": true, "whatsappNumber": "+447462933406", "whatsappEnabled": true}, "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-11-23 14:56:33.972
cmibud2fe007brx013ht5yy8b	SETTINGS_UPDATED	{"category": "floating", "settingsChanged": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-11-23 14:56:58.25
cmibud2ff007crx01pt2p8wtr	SETTINGS_UPDATED	{"category": "Floating Contact", "settings": {"phoneNumber": "07312110885", "phoneEnabled": true, "whatsappNumber": "07312110885", "whatsappEnabled": true}, "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-11-23 14:56:58.252
cmibud3f2007hrx01ze9lk1du	SETTINGS_UPDATED	{"category": "floating", "settingsChanged": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-11-23 14:56:59.534
cmibud3f3007irx01527tkfa5	SETTINGS_UPDATED	{"category": "Floating Contact", "settings": {"phoneNumber": "07312110885", "phoneEnabled": true, "whatsappNumber": "07312110885", "whatsappEnabled": true}, "adminEmail": "info@aberdeenshireplanthire.co.uk", "updatedKeys": ["floating_phone_enabled", "floating_phone_number", "floating_whatsapp_enabled", "floating_whatsapp_number"]}	\N	2025-11-23 14:56:59.535
cmibue7jg007mrx01luy0g3we	SETTINGS_UPDATED	{"category": "contact", "settingsChanged": ["contact_email", "contact_phone", "contact_address"]}	\N	2025-11-23 14:57:51.532
cmibue7ji007nrx01haey06zg	SETTINGS_UPDATED	{"category": "Contact Information", "adminEmail": "info@aberdeenshireplanthire.co.uk", "contactInfo": {"contactEmail": "info@aberdeenshireplanthire.co.uk", "contactPhone": "+447312110885", "contactAddress": ""}, "updatedKeys": ["contact_email", "contact_phone", "contact_address"]}	\N	2025-11-23 14:57:51.535
cmibvlwu4007urx01sjor1rle	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvlwtx007prx01bduc8pdl", "equipmentName": "plant trailer 3.5 tonnes"}	\N	2025-11-23 15:31:50.524
cmibvq6jv007yrx01l984lmar	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvq6jr007vrx01zcd5bvv1", "equipmentName": "plant trailer 9x4"}	\N	2025-11-23 15:35:09.74
cmibvqfha0081rx01r5hs2tmh	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvq6jr007vrx01zcd5bvv1", "equipmentName": "plant trailer 9x4"}	\N	2025-11-23 15:35:21.311
cmibvty600085rx01c1mzuwqy	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvty5w0082rx01hfjavx1i", "equipmentName": "tipping trailer with mesh side"}	\N	2025-11-23 15:38:05.496
cmibvu4ge0088rx0197z2pkme	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvty5w0082rx01hfjavx1i", "equipmentName": "tipping trailer with mesh side"}	\N	2025-11-23 15:38:13.647
cmibvzjc6008crx01j0pftb2p	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvzjc30089rx01jrf3jvf1", "equipmentName": "14 ft flat bed drop side trailer LM146"}	\N	2025-11-23 15:42:26.215
cmibvzpo9008frx01g2s1368w	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvzjc30089rx01jrf3jvf1", "equipmentName": "14 ft flat bed drop side trailer LM146"}	\N	2025-11-23 15:42:34.425
cmibw6ad0008mrx01de4nyye2	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibw6acr008hrx01zqdaevit", "equipmentName": "propane torch"}	\N	2025-11-23 15:47:41.172
cmibw7heb008qrx01k1xgk0p8	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibw7he8008nrx01h5yo6cqk", "equipmentName": "port-a-power 10 tonne"}	\N	2025-11-23 15:48:36.947
cmibw7ni9008trx01fnukxdia	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibw7he8008nrx01h5yo6cqk", "equipmentName": "port-a-power 10 tonne"}	\N	2025-11-23 15:48:44.865
cmibwfw38008xrx01c7ex9f0d	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibwfw33008urx01u5tj0s0v", "equipmentName": "enerpac hydraulic p80 hydraulic hand pump"}	\N	2025-11-23 15:55:09.236
cmibwk0bl0091rx01w399yr04	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibwk0bf008yrx01b3t7ikol", "equipmentName": "low profile hydraulic rams"}	\N	2025-11-23 15:58:21.345
cmibwla7c0096rx01zedpev31	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmibsizsd006lrx01m78tooha", "equipmentName": "alloy scaffold tower "}	\N	2025-11-23 15:59:20.809
cmibwlzjt009brx01qtizapax	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmibsizsd006lrx01m78tooha", "equipmentName": "alloy scaffold tower "}	\N	2025-11-23 15:59:53.657
cmibwmmqi009grx01yyjaib0m	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmibsizsd006lrx01m78tooha", "equipmentName": "alloy scaffold towerr"}	\N	2025-11-23 16:00:23.706
cmibwntry009mrx01e115sgji	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmibsizsd006lrx01m78tooha", "equipmentName": "alloy scaffold tower"}	\N	2025-11-23 16:01:19.487
cmibwo22v009nrx010ivqhayw	PRODUCT_DELETED	{"productId": "cmibsizsd006lrx01m78tooha", "productName": "alloy scaffold tower"}	\N	2025-11-23 16:01:30.248
cmibws7e1009vrx01z1ua4aq8	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmibws7du009orx01s7euirwj", "equipmentName": "alloy scaffold tower"}	\N	2025-11-23 16:04:43.754
cmibx1opz00a2rx016ca36ip6	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibx1opr009xrx01dflulth5", "equipmentName": "mobile dust extraction air mover"}	\N	2025-11-23 16:12:06.119
cmibx8gj900a8rx013leby55y	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibx8gj300a3rx01nl8o4dgi", "equipmentName": "industrial dehumidifier"}	\N	2025-11-23 16:17:22.102
cmibxed5x00afrx01hbd3um92	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibxed5r00aarx01onf4zhkr", "equipmentName": "heavy duty industrial hoover"}	\N	2025-11-23 16:21:57.67
cmibxlpjv00alrx01qgyoqaav	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibxlpjn00agrx011qp9kywe", "equipmentName": "carpet cleaner"}	\N	2025-11-23 16:27:40.316
cmibxpvll00asrx01lpzjpv76	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtpk50008qq2wpqf7zdoc", "equipmentName": "Log Splitter Vertical and Horizontal Use"}	\N	2025-11-23 16:30:54.778
cmibxqbep00azrx01s2i0dv0q	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbsmtpkc000bqq2w5gxxnclw", "equipmentName": "Pressure Washer with Attachments"}	\N	2025-11-23 16:31:15.266
cmibxqnge00b8rx01aba4youw	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmbsmtpkv000hqq2wdv5wycm7", "equipmentName": "Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers"}	\N	2025-11-23 16:31:30.879
cmibxr9ts00bjrx01v9hy8myv	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 5, "equipmentId": "cmbsmtplt000zqq2wdiczclax", "equipmentName": "SDS Drills and Breakers"}	\N	2025-11-23 16:31:59.872
cmibxrsi200bmrx01gosgg08z	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmbsmtpm90018qq2w1vd2xnb1", "equipmentName": "Lighting Tower and Generator"}	\N	2025-11-23 16:32:24.074
cmibxs6ch00btrx01toozha5g	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 3, "equipmentId": "cmbta7aga000lod01v3fq50tc", "equipmentName": "stihl post hole auger"}	\N	2025-11-23 16:32:42.017
cmibxsmml00c2rx014curt4ne	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmd0n2juw000ble01a5asz888", "equipmentName": "timberwolf 6\\" chipper "}	\N	2025-11-23 16:33:03.117
cmibxsyz200cbrx01f4cm5kta	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmd0n2juw000ble01a5asz888", "equipmentName": "timberwolf 6\\" chipper "}	\N	2025-11-23 16:33:19.118
cmibxtpo800ckrx01hxend0q2	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 4, "equipmentId": "cmd0n2juw000ble01a5asz888", "equipmentName": "timberwolf 6\\" chipper "}	\N	2025-11-23 16:33:53.72
cmibxu67300cnrx01i9ssdt1a	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibwk0bf008yrx01b3t7ikol", "equipmentName": "low profile hydraulic rams"}	\N	2025-11-23 16:34:15.136
cmibxucq500cqrx01s628gnld	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibwfw33008urx01u5tj0s0v", "equipmentName": "enerpac hydraulic p80 hydraulic hand pump"}	\N	2025-11-23 16:34:23.597
cmibxuhy600ctrx0169ebyq74	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibw7he8008nrx01h5yo6cqk", "equipmentName": "port-a-power 10 tonne"}	\N	2025-11-23 16:34:30.367
cmibxvdzv00cwrx017fvtln4o	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibwk0bf008yrx01b3t7ikol", "equipmentName": "low profile hydraulic rams"}	\N	2025-11-23 16:35:11.899
cmibxvqfo00czrx0104kxe13v	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvzjc30089rx01jrf3jvf1", "equipmentName": "14 ft flat bed drop side trailer LM146"}	\N	2025-11-23 16:35:28.02
cmibxwfd000d4rx01puq8fa2w	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 2, "equipmentId": "cmibvty5w0082rx01hfjavx1i", "equipmentName": "tipping trailer with mesh side"}	\N	2025-11-23 16:36:00.325
cmibxx63a00d7rx01b1gwjjze	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibvq6jr007vrx01zcd5bvv1", "equipmentName": "plant trailer 9x4"}	\N	2025-11-23 16:36:34.966
cmibxxaqq00d8rx01e6hpy1qq	PRODUCT_DELETED	{"productId": "cmibvq6jr007vrx01zcd5bvv1", "productName": "plant trailer 9x4"}	\N	2025-11-23 16:36:40.994
cmibxzwp300derx016pz8xtv3	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibxzwot00d9rx01w5eadxxq", "equipmentName": "plant trailer"}	\N	2025-11-23 16:38:42.759
cmiby0hu100dfrx01fhsipt3k	PRODUCT_DELETED	{"productId": "cmibvty5w0082rx01hfjavx1i", "productName": "tipping trailer with mesh side"}	\N	2025-11-23 16:39:10.154
cmiby1rn700dlrx01tme8sx3y	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmiby1rn200dgrx010ldlgr33", "equipmentName": "tipping trailer with mesh sides"}	\N	2025-11-23 16:40:09.523
cmiby2e4000dmrx01cwhyfyga	PRODUCT_DELETED	{"productId": "cmibvzjc30089rx01jrf3jvf1", "productName": "14 ft flat bed drop side trailer LM146"}	\N	2025-11-23 16:40:38.641
cmiby3xkg00dsrx01qhnapvtb	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmiby3xka00dnrx019ckx7utp", "equipmentName": "14 ft flat bed drop side trailer LM146"}	\N	2025-11-23 16:41:50.513
cmiby4bm700dvrx01m4mvlov5	EQUIPMENT_UPDATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmibwk0bf008yrx01b3t7ikol", "equipmentName": "low profile hydraulic rams"}	\N	2025-11-23 16:42:08.719
cmiby548700dwrx01d89ja11c	PRODUCT_DELETED	{"productId": "cmibwk0bf008yrx01b3t7ikol", "productName": "low profile hydraulic rams"}	\N	2025-11-23 16:42:45.799
cmiby6sbk00e2rx01c9l8vwsj	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmiby6sbe00dxrx012jy05szs", "equipmentName": "enerpac panacake rams"}	\N	2025-11-23 16:44:03.68
cmiby746l00e3rx01jvc48ub4	PRODUCT_DELETED	{"productId": "cmibwfw33008urx01u5tj0s0v", "productName": "enerpac hydraulic p80 hydraulic hand pump"}	\N	2025-11-23 16:44:19.053
cmiby7qt000e9rx01jtw9f2gz	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmiby7qst00e4rx01vv3sebyk", "equipmentName": "enerpac p80 hydraulic hand pump"}	\N	2025-11-23 16:44:48.372
cmiby8fus00earx01rxtgfwqy	PRODUCT_DELETED	{"productId": "cmibw7he8008nrx01h5yo6cqk", "productName": "port-a-power 10 tonne"}	\N	2025-11-23 16:45:20.837
cmiby9bn900egrx013l6vgu33	EQUIPMENT_CREATED	{"adminEmail": "info@aberdeenshireplanthire.co.uk", "imageCount": 1, "equipmentId": "cmiby9bn500ebrx01k7fspn7k", "equipmentName": "10 tonne port a power kit"}	\N	2025-11-23 16:46:02.037
cmic48gyo00eirx01omyz6933	CONTACT_SUBMITTED	{"email": "ejthomson297@gmail.com", "contactId": "cmic48gym00ehrx01jpx7h4vc", "equipment": "1.8T Excavator"}	\N	2025-11-23 19:33:19.968
cmik1gyc000ekrx01j7pecoj6	CONTACT_SUBMITTED	{"email": "neillie@outlook.com", "contactId": "cmik1gybx00ejrx01d4j75qy4", "equipment": "800Kg Tracked Dumper"}	\N	2025-11-29 08:38:06.288
cmikfpqu100emrx01640ndmrc	CONTACT_SUBMITTED	{"email": "chris.w.mackinnon@gmail.com", "contactId": "cmikfpqty00elrx014ks5bnb0", "equipment": "Petrol driven ‘Turf Cutter’"}	\N	2025-11-29 15:16:51.097
cmj5ha5cj0001rx010c9le468	CONTACT_SUBMITTED	{"email": "jknowlson18@gmail.com", "contactId": "cmj5ha5c30000rx01u3b8uvcl", "equipment": "petrol stump grinder"}	\N	2025-12-14 08:43:52.34
cmj5mobji0003rx01agbop97z	CONTACT_SUBMITTED	{"email": "jamesgibbsco@gmail.com", "contactId": "cmj5mobj60002rx01embwfnk1", "equipment": "Floor and Stone Saws"}	\N	2025-12-14 11:14:51.631
cmj9vunrv0001rx01p2n53rnf	CONTACT_SUBMITTED	{"email": "smacdearmid82@gmail.com", "contactId": "cmj9vunr60000rx014cdv02mw", "equipment": "vibrating plate"}	\N	2025-12-17 10:42:48.668
cmjciv79w0001rx016yj8399v	CONTACT_SUBMITTED	{"email": "mmbarclaydunbar@outlook.com", "contactId": "cmjciv7990000rx01wo64cyjg", "equipment": "Micro Excavator"}	\N	2025-12-19 07:02:37.461
cmjfp9f4w0001rx01wdxug9dh	CONTACT_SUBMITTED	{"email": "gary.donut@sky.com", "contactId": "cmjfp9f4a0000rx01vqardihw", "equipment": "Rollers 800mm and 1200mm"}	\N	2025-12-21 12:24:57.056
cmjh7gnl30001rx01quxz2wae	CONTACT_SUBMITTED	{"email": "steven.hosie@yahoo.co.uk", "contactId": "cmjh7gnko0000rx01jbow7p75", "equipment": "industrial dehumidifier"}	\N	2025-12-22 13:42:13.863
cmjhqyio20001rx01vrxvhn98	CONTACT_SUBMITTED	{"email": "steven.hosie@yahoo.co.uk", "contactId": "cmjhqyimh0000rx01r3dpa8c7", "equipment": "industrial dehumidifier"}	\N	2025-12-22 22:48:00.002
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Category" (id, name, slug, description, "imageUrl", "createdAt", "updatedAt") FROM stdin;
cmbsmtpjh0000qq2wzn4l0df4	Diggers	diggers	Excavators and digging equipment for construction and landscaping projects	\N	2025-06-12 00:20:06.414	2025-06-12 00:44:56.199
cmbsmtpjm0001qq2w5kmqh5wx	Dumpers	dumpers	Dumper trucks and material transport vehicles	\N	2025-06-12 00:20:06.418	2025-06-12 00:44:56.203
cmbsmtpjo0002qq2wr6bmaril	Rollers	rollers	Road rollers and compaction equipment	\N	2025-06-12 00:20:06.421	2025-06-12 00:44:56.205
cmbsmtpjq0003qq2w5q8ja5om	Landscaping Tools	landscaping-tools	Tools and equipment for landscaping and garden maintenance	\N	2025-06-12 00:20:06.422	2025-06-12 00:44:56.206
cmbsmtpjs0004qq2ws6a8ly0q	Concrete Tools	concrete-tools	Concrete mixing, pouring and finishing equipment	\N	2025-06-12 00:20:06.424	2025-06-12 00:44:56.208
cmibs9f2k006drx01jammxu00	ground care	ground-care	ground care equipment 	\N	2025-11-23 13:58:08.78	2025-11-23 13:58:08.78
cmibw2n4t008grx018853fg7y	engineering tools 	engineering-tools-	RAMS TORCHES 	\N	2025-11-23 15:44:51.101	2025-11-23 15:44:51.101
cmibwndol009hrx01xbge6m9b	alloy scaffold tower 	alloy-scaffold-tower-	\N	\N	2025-11-23 16:00:58.629	2025-11-23 16:00:58.629
cmibwsuqv009wrx01trcxly66	heating, ventilation and dehumidifiers 	heating-and-ventilation-	\N	\N	2025-11-23 16:05:14.023	2025-11-23 16:13:22.474
cmibx9b0l00a9rx01zd3r85eq	cleaning 	cleaning-	\N	\N	2025-11-23 16:18:01.606	2025-11-23 16:18:01.606
cmibv8k1e007orx012nvp01s3	trailers 	trailers-	trailers from plant trailers to tipping trailers 	\N	2025-11-23 15:21:27.411	2025-11-23 16:35:39.555
\.


--
-- Data for Name: ContactSubmission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ContactSubmission" (id, "fullName", email, phone, equipment, message, "isRead", "createdAt", "updatedAt") FROM stdin;
cmc9civ2m004apm013hbrqdo6	Will Hepburn	wjhdata@mail.com	\N	1.8T Excavator	Need to hire for a week in July	t	2025-06-23 17:03:49.198	2025-06-26 18:03:50.084
cmcibrhze000wpb01sh950457	Yunus Aktas	grafiker.yunusaktas@gmail.com	05413438192	Yunus Aktasasd	asdasdasdasd	t	2025-06-29 23:52:28.106	2025-06-30 00:06:55.722
cmcxiur3g0004le011j73730i	test charley	charsul22@gmail.com	07338384982	TEST	TESTING CONV	t	2025-07-10 15:07:29.836	2025-07-10 16:27:09.822
cmcxiai950002le01drs31hrw	Charley TEST	charsul22@gmail.com	07338384982	TEST	TESTING ADS	t	2025-07-10 14:51:45.256	2025-07-10 16:27:11.961
cmcw1wtbr0000le01sq8jrext	Mike Hanson	xlimage@hotmail.co.uk	07799308989	3T Excavator	3 tonne excavator and 1 tonne dumper 7 day hire all in cost inc. delivery to AB393SL	t	2025-07-09 14:25:26.391	2025-07-10 16:27:13.82
cme0jwek20000rx015vvlf1ry	Test User	test@example.com	+44 123 456 7890	Excavator	Test email configuration - Docker container	t	2025-08-06 22:39:47.378	2025-08-07 17:57:08.182
cmd8l1wie000xle0143ac529y	Ian Chrystie	iangchrystie@gmail.com	07562012061	stihl post hole auger	I need a post auger this weekend to drill holes for 14 off 4"x4"x 8' fence posts with postfix. Whatever size auger you suggest for that. Cheers	t	2025-07-18 08:54:30.614	2025-07-20 09:02:13.458
cmd5tmli1000vle013hubove9	John Little	john.little@indaver.com	07901 946485	800Kg Tracked Dumper	Trying to get a hire price per day/week for this or something that provides similar functionality, but we have a weight limit of <2-tonnes as a gross weight for the vehicle as we need to lift it through a hatch and into a bunker	t	2025-07-16 10:31:14.521	2025-07-20 09:02:15.155
cmdc5wewy0011le01aw5mok36	David McIntosh	scmcintosh@hotmail.co.uk	07853194841	timberwolf 6" chipper	Looking for hire price and availability	t	2025-07-20 21:01:24.994	2025-07-22 13:42:00.917
cmdk1c0gt0001le0111umfzrt	Ellie spurrier	elliespurrier@gmail.com	\N	Dumper	We need a dumper preferably a 5tonne. Can you let us know cost and when it would be available. We are in Aberlour.	t	2025-07-26 09:15:44.093	2025-07-29 18:56:39.693
cmdnasfad0007le01uz04k8d3	TOM MILLER	trmbanff55@yahoo.com	07923581126	Micro Excavator	I'd like to enquire about hiring a digger. Please get in touch. Many thanks, Tom Miller	t	2025-07-28 16:03:44.869	2025-07-29 19:12:16.042
cmdmslvf00005le01ce9qxhlx	Alexander MACKAY	sandy.mackay66@btinternet.com	07712446480	Cement Mixers	Require small electric mixer  this week for if possible. Will collect/return.	t	2025-07-28 07:34:46.092	2025-07-29 19:12:18.03
cmdk6a3lb0003le01s7scwg1j	Relu Afloarei	reluafloarei@gmail.com	07823704577	stihl post hole auger	Westhill Aberdeen shire. Need the digger for one day. \nPlease send a quotation.\nThank you!	t	2025-07-26 11:34:12.911	2025-07-29 19:12:21.16
cmdo7vw7z0009le01aybe73lz	Rory Grant	grantrory119@gmail.com	07787195288	Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers	Good morning,\nCan I please hire a grass strimmer and possibly leaf blower - leaf blower not essential though. Please get back to me as soon as possible.\nKind regards,\nRory Grant	t	2025-07-29 07:30:14.111	2025-07-29 19:14:29.15
cmdrhf1hd000gle01m2f1w1zh	Ian kennedy	tkennedy76@outlook.com	07939981273	800Kg Tracked Dumper	Looking for availability for 1 week hire for delivery 1st or 2nd August	t	2025-07-31 14:20:22.466	2025-07-31 16:39:13.837
cmdsixj55000jle01t8hb7d06	Alex newman	alex.newman11@gmail.com	07932698508	Micro Excavator	Digger hire for hire today for the weekend please	t	2025-08-01 07:50:30.954	2025-08-01 12:33:47.715
cme0iog0w0002p801p0snet3m	Test User	test@example.com	+44 123 456 7890	Excavator	Test email configuration message	t	2025-08-06 22:05:36.416	2025-08-07 17:57:10.346
cme0ho6yj0000p801zn9apwd4	Test User	test@example.com	+44 123 456 7890	Excavator	Test email configuration message	t	2025-08-06 21:37:25.033	2025-08-07 17:57:12.67
cme0gqwpj000tle013aqovt0k	Yunus Aktaş	umbrelladigitals@gmail.com	05413438192	concrete finishing tools	asdasdasdasdasdas	t	2025-08-06 21:11:32.119	2025-08-07 17:57:14.857
cme0gqolg000rle01xcnw8nkp	Yunus Aktaş	umbrelladigitals@gmail.com	05413438192	tests	asdasdadsss	t	2025-08-06 21:11:21.604	2025-08-07 17:57:17.348
cme2ynuig0007rx01ghcdhm89	Zoe Waite	zoewaite1@gmail.com	07758090001	All	Hi hdhidisjnsbsyys	t	2025-08-08 15:08:34.744	2025-08-08 15:44:34.595
cme326xss000arx01rtwca5co	Yunus Aktaş	umbrelladigitals@gmail.com	05413438192	General Enquiry	asdasdasd	t	2025-08-08 16:47:24.317	2025-08-09 13:27:17.336
cme7jqo50000frx01n40e23o6	Yunus Aktas	grafiker.yunusaktas@gmail.com	05413438192	General Enquiry	asdasdasdasdasd	t	2025-08-11 20:09:43.092	2025-08-13 18:38:06.852
cme7kctvo000nrx010eyg5rq3	Yunus Aktaş	umbrelladigitals@gmail.com	05413438192	concrete finishing tools	asdasd	t	2025-08-11 20:26:56.964	2025-08-13 18:38:08.032
cme89lldk000prx01i46c8zvh	Peter Jones	emails@miracleventures.co.uk	07908152538	3t digger, 3t dumper, cement mixer	delivery to Drumoak, AB31 5AG - Friday 5th Sept, collect Monday 15th.	t	2025-08-12 08:13:36.248	2025-08-13 18:38:10.548
cme9rm1zs000rrx01silki2t1	John grubb	john.grubb@outlook.com	07739188670	Micro Excavator	Weekend hire of micro digger price please	t	2025-08-13 09:25:37.048	2025-08-13 18:38:13.872
cme9xbq5x000trx01wgcuoor6	James Morris	thatmo1@googlemail.com	07740 674312	Mini digger	To dig several 1.5m deep test holes for engineers assessment for garage foundation.	t	2025-08-13 12:05:32.852	2025-08-13 18:38:15.236
cme9zqfx5000vrx01wy9jvmn0	Dean mcintosh	mcintoshdean56@gmail.con	07950931190	timberwolf 6" chipper	I was wondering how much a wood chipper would cost for 2 day and I would need it delivered lumphanan aberdeenshire	t	2025-08-13 13:12:58.649	2025-08-13 18:38:18.891
cme5wnvu7000drx01xdz4cdoa	Shona Childs	drumbulg@gmail.com	07803414120	timberwolf 6" chipper	Cost of weekend hire please	t	2025-08-10 16:35:55.759	2025-08-13 18:38:27.878
cmebkisn00014rx01sqyj35mb	James Buchan	jamesmb62@hotmail.com	07802264175	Petrol auger	For digging out post holes for 4x4 8ft posts	t	2025-08-14 15:42:39.978	2025-08-15 16:21:37.049
cmei39lhj001frx01wvragbsw	Andrew Reid	andrew.reid84@yahoo.co.uk	07927404707	1.8T Excavator	Digging up my garden	t	2025-08-19 05:14:00.583	2025-08-23 07:44:51.889
cmegrvdl2001drx01n1x4kd2r	Aaron McDougall	mcdougallad@googlemail.com	07585301696	Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers	Hi, looking to hire a turf lifter and a tiller/rotavator, both for one day as soon as possible. Please also quote for delivery and collection to Banchory. Many thanks.	t	2025-08-18 07:07:15.193	2025-08-23 07:44:56.6
cmee8dn7f001brx017q29vqxn	Ken	kenregan@ymail.com	07901512966	Mini barrow.	Just enquiring at the moment for a mini barrow for a week in September.	t	2025-08-16 12:26:02.811	2025-08-23 07:45:02.442
cmee5janc0019rx01mrmu2suz	Laura Walton	lauraseymour25@gmail.com	07543306336	Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers	Tuft	t	2025-08-16 11:06:27.624	2025-08-23 07:45:08.816
cmedxzjx30017rx01ri8075ed	John Mcgrory	mcgee8080@icloud.com	07711268010	Floor sander	Looking for up right floor sander	t	2025-08-16 07:35:09.207	2025-08-23 07:45:12.495
cmeldu5ds001lrx01lkhl9e6b	Jason P Hill	jkhill6979@gmail.com	07365241484	timberwolf 6" chipper	2 day hire needed with delivery and pick up required.\nAddress:\nTall Trees, Breda Park ALFORD AB33 8NN	t	2025-08-21 12:33:14.176	2025-08-23 07:45:17.747
cmeldusag001nrx01vvhuq3gq	Jason P Hill	jkhill6979@gmail.com	07365241484	timberwolf 6" chipper	2 day hire needed (3-4 Sep) with delivery and pick up required.\nAddress:\nTall Trees, Breda Park ALFORD AB33 8NN	t	2025-08-21 12:33:43.864	2025-08-23 07:45:20.693
cmeibv074001hrx01js9rmrtf	Neil Newcombe	newks48@hotmail.com	07584635832	One tone electric mobile winch	I have a plot of land that I need to clear established bush	t	2025-08-19 09:14:36.352	2025-08-23 07:44:45.041
cmejulx2l001jrx01r0tirose	Peter Stewart	peter@pvproperty.co.uk	07825835327	1.8T Excavator	Good morning, please can you let me know the daily hire rate for this mini digger? Thanks	t	2025-08-20 10:47:11.278	2025-08-23 07:44:46.201
cmepir67o001yrx01n20ft023	Rebecca Coutts	rebeccacoutts@outlook.com	07712227924	3T dumper, 1.8T excavator + log splitter	Hi there! \nWe are currently renovating our garden and will require the following machinery at different periods in time. I was hoping for individual quotes on the three pieces of equipment per week if possible, thanks!	t	2025-08-24 10:01:58.068	2025-08-24 15:18:23.735
cmg9hm7b9003hrx011lnlauf3	Stewart MacDearmid	smacdearmid82@gmail.com	07766613015	800Kg Tracked Dumper	Looking for a price for a 1 day hire in New Deer.	t	2025-10-02 14:05:12.453	2025-10-03 16:58:17.043
cmg9gfja9003frx01jkgkx5mr	Martin bruce	bruce505@hotmail.co.uk	07557132005	Rollers 800mm and 1200mm	Looking for a quote for 1200mm roller for a day	t	2025-10-02 13:32:01.761	2025-10-03 16:58:22.93
cmg80y3yx003drx01vem96w0u	Gareth Coutts	couttsgs@outlook.com	07864845779	Cement Mixers	Weekend hire petrol cement mixer, delivered to cove bay Aberdeen	t	2025-10-01 13:30:48.344	2025-10-03 16:58:30.035
cmg5eiogu003brx01pg6x8qlw	Donna Ward	dwardbrook@hotmail.com	07368181579	wood chipper	Hi - do you hire wood shredder / chippers? Thanks.	t	2025-09-29 17:27:24.51	2025-10-03 16:58:35.794
cmg59yfuy0039rx01plpcprsz	Craig brown	brooner22@yahoo.co.uk	07970459386	Micro Excavator	Hello there \n\nI was wondering how much a hire cost for micro mini digger and delivery to Ellon	t	2025-09-29 15:19:41.77	2025-10-03 16:58:42.712
cmg24ac090037rx010ef77sat	Ivor Nicol	ivornicol@hotmail.com	07988291374	timberwolf 6" chipper	Require 2 day hire, 17/10/25. Drop off and collection required Banchory.\nPlease provide quote.	t	2025-09-27 10:17:40.425	2025-10-03 16:58:47.837
cmg0pyk870035rx01sg7lq4gh	Isobel Hindmarch	ibbyhmh741@gmail.com	07708353504	Floor and Stone Saws	Saw required for cutting garden slabs	t	2025-09-26 10:48:50.408	2025-10-03 16:58:51.15
cmfxr2ey00033rx01kn3qypl0	Ewan Jamieson	ewanjamieson@hotmail.co.uk	07584583633	1.8T Excavator	Hi, I'm looking to hire either a 1.8T or a micro digger plus a cement mixer next weekend (4th/5th October) if you have available?\nThanks, Ewan.	t	2025-09-24 08:56:31.271	2025-10-03 16:59:07.295
cmfpeh22c0031rx0136inq5rd	Ben Strachan	benstrachan92@hotmail.co.uk	07944663906	SDS Drills and Breakers	Breaking up a concrete path for underpinning underneath it’s already cut with still saw would need like a jackhammer for half a day possibly full day not sure.	t	2025-09-18 12:41:50.004	2025-10-03 16:59:13.85
cmfaxykaz002zrx015q6cqphy	STUART MONTGOMERY	bigstuno176@yahoo.co.uk	07835072587	stihl post hole auger	How much to hire for a day	t	2025-09-08 09:50:46.859	2025-10-03 16:59:22.71
cmf9moefq002xrx01bqhpqpt6	Geoff Doyle	geoff.doyle@hotmail.co.uk	07789638654	Concrete mixer & post hole borer	1 weeks hire \nDelivery and collection from Insch	t	2025-09-07 11:47:10.743	2025-10-03 16:59:24.674
cmf9mlq7n002vrx01m09bfi48	Geoffrey Doyle	geoff.doyle@hotmail.co.uk	07789638654	Concrete mixer & post hole borer	1 weeks hire \nDelivery and collection to Insch	t	2025-09-07 11:45:06.022	2025-10-03 16:59:27.467
cmf8do5yr002trx018idl0yg3	Robert Davidson	robertpgdavidson@gmail.com	07826847872	Micro Excavator	Looking to hire a Micro or 1.8T mini digger for a weekend hire.	t	2025-09-06 14:47:17.043	2025-10-03 16:59:39.874
cmf5uf8yu002rrx01syc1nmpm	Dan allen	dr.dan.allen1995@gmail.com	07815427405	Log Splitter Vertical and Horizontal Use	Log splitter	t	2025-09-04 20:12:55.974	2025-10-03 16:59:44.75
cmf5t1ku1002prx01h78moka3	Brian Conn	bydand04@hotmail.com	07587530731	A Cement Mixer	Good evening, would it be possible if you can, supply m with a quote to hire a cement mixer, I live @ AB51 8TQ, St.Katherines, Inverurie.	t	2025-09-04 19:34:18.553	2025-10-03 16:59:46.548
cmf5g9vo3002nrx01mrwmc7yd	Craig Grassick	craig.grassick@3tglobal.com	07736036489	3T Excavator	3t digger required for 4pm Friday 5th September unit 4pm Saturday \n\n24 hour hire	t	2025-09-04 13:36:50.835	2025-10-03 16:59:48.996
cmf2rk14a002lrx01bnzu9vyg	Bryan Kee	bkee65@yahoo.co.uk	07399994621	1.8T Excavator	Following up on my email. Can you confirm a price for a weeks hire of this digger, from Friday 5th Sept for 1 week to Friday 12th Sept. Delivery to IV30 8LR	t	2025-09-02 16:29:21.706	2025-10-03 16:59:51.715
cmf0v6xu6002jrx01iflbvj75	Marc	mastermarc2013@gmail.com	07565270062	Micro Excavator	As per phone call this morning to hire a mini digger for 2 days in foggie. \nAddress. 3-4 The square. Aberchirder. AB54 7TA	t	2025-09-01 08:35:37.023	2025-10-03 16:59:58.573
cmezjex05002hrx01baajh2bd	John stronach	mrjstronach@gmail.com	07957482486	petrol stump grinder	Looking to hire	t	2025-08-31 10:18:07.637	2025-10-03 17:00:01.262
cmewgty7r002frx01xigcfrrt	Pamela Goodlad	pamelagoodlad@hotmail.com	7931583514	Micro Excavator	How much to hire a micro digger per day? Or per weekend? Including vat/delivery to Queen St Peterhead	t	2025-08-29 06:42:31.67	2025-10-03 17:00:03.085
cmewfvvqa002drx01ntw6hp87	John O’Dwyer	johnodwyer14@hotmail.com	07793 242707	Lawn Mower	I’m looking for a quote to hire a lawn mower over the weekend.  Delivery address is Greenways, Dalmuinzie Road, Bieldside, Aberdeen, AB15 9EB	t	2025-08-29 06:16:02.146	2025-10-03 17:00:05.115
cmeuhsmnr002brx01ccfikshp	Scott Cummings	scottcummings1970@hotmail.co.uk	07960 003315	Turf cutter	Hi, looking to rent a turf cutter tomorrow. Do you have available? What’s the cost?	t	2025-08-27 21:33:57.303	2025-10-03 17:00:07.542
cmesf0nla0029rx01x7lf3acq	Bryan Kee	bkee65@yahoo.co.uk	07399994621	1.8T Excavator	Can you give me a quote for a 1 week hire please. Would need it dropped off and picked up from IV30 8LR	t	2025-08-26 10:40:40.558	2025-10-03 17:00:09.14
cmer3shl80027rx01c4myj9wo	William Tait	billytait1988@gmail.com	07510386215	timberwolf 6" chipper	Would need a chipper for between 4 and 7 days being used for domestic garden clearing lots of trees to get rid of lmao	t	2025-08-25 12:38:37.58	2025-10-03 17:00:12.39
cmgtdm6ic004frx01wpzfbpht	Colin Sinclair	colin.sinclair@cyanrenewables.com	07786442059	Concrete cutter	Looking to cut a hole in a concrete pad in a workshop needs to be 1m square concrete is 200 mm deep would use a blade cutter or bore line of holes with core cutter what do you have available	t	2025-10-16 12:08:36.453	2025-11-23 13:42:11.745
cmgplsk2u004drx01t1jjxwj2	Lewis metcalf	lmetcalf1993@hotmail.com	\N	petrol stump grinder	Hire of the stump grinder for 48hrs and to be used at 1 market hill longside Ab424td	t	2025-10-13 20:46:26.215	2025-11-23 13:42:12.912
cmgno8yfb004brx01sqjp7zjv	Fraser	fraserford86@gmail.com	07460718591	Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers	Hello \nI am looking for a price to hire a corer for the garden for a couple of days. Is this something you have?\nI am based in portlethen \nThanks	t	2025-10-12 12:19:38.165	2025-11-23 13:42:15.377
cmgl7fze60049rx01yy5ktd9s	Alastair Clark	jenniclark10@aol.com	07831 545632	50mm or 75mm centrifugal water pump	I’m looking to find out if you have the above equipment available to hire and if so costs.	t	2025-10-10 18:53:40.206	2025-11-23 13:42:20.345
cmgc0q4gg0047rx012utkdcb0	Jacoba van engelen	jjwvane@gmail.com	07475806899	1.8T Excavator	Needed in Deskford near lintmill	t	2025-10-04 08:35:40.432	2025-11-23 13:42:21.744
cmiabeidc005brx01sp1hyzvm	Barbara Henderson	babsboogiewoogie@hotmail.co.uk	07818008184	Lifting	I need to lift a 220kg boiler up 3 steps and in through doorway	t	2025-11-22 13:18:26.67	2025-11-23 13:41:30.374
cmi3na0ob0059rx01g65v8h86	matthew booth	matty.booth92@googlemail.com	07979262368	Trench Rammer and Vibrating Plate	Require trench rammer and wacker plate Thursday Friday.	t	2025-11-17 21:16:29.291	2025-11-23 13:41:35.202
cmi3c09f10057rx012ui7omd9	Sheila Garland	sheliagarland@sky.com	07710617476	1.8T Excavator	Just for digging drift off my drive	t	2025-11-17 16:00:58.285	2025-11-23 13:41:38.67
cmhrad9lj0055rx01ygame3d8	Mike morgan	mike@linganbo.co.uk	07776216841	Portable conveyor belt system for soil transport	Removing soil from a 4 ft wide alley along side a house about 40 ft long because the soil height is too high and causing dampness in the solum. Ideally, this would deliver the soil into a container on the street for disposal approx 50 ft away	t	2025-11-09 05:41:51.703	2025-11-23 13:41:40.809
cmhnfw76y0053rx01vli9or5h	Bryan	bryanforbes_1990@hotmail.co.uk	07968472860	1.8T Excavator	Hire rates for weekend use of 1.8t Excavator. Delivery to Turriff	t	2025-11-06 13:05:28.426	2025-11-23 13:41:42.505
cmhm7nyrr0051rx01u19kfmlr	ROB GOLDIE	goldie.rob@gmail.com	07974449809	petrol stump grinder	1 day hire	t	2025-11-05 16:27:21.159	2025-11-23 13:41:44.439
cmhhswazm004zrx01mubc5830	Roy Fairhead	royf18@hotmail.com	07790565115	timberwolf 6" chipper	I'm looking to hire this for a day if possible, for a small job near Inverurie. I can pick it up and drop it off	t	2025-11-02 14:22:51.298	2025-11-23 13:41:45.711
cmhccs9sh004xrx01ckuudtfp	Anthony Ormrod	anthonyormrod@yahoo.co.uk	07304084830	3T Excavator	Looking for a rental for between 3 and 5 days	t	2025-10-29 18:52:58.385	2025-11-23 13:41:55.891
cmh8yfwh1004vrx01wosm5068	Paul Hourston	fitliken@hotmail.com	07919998574	Diesel mixer	Looking for delivery and hire of a diesel mixer starting December 1st for 2 weeks to a job outside of Methlick	t	2025-10-27 09:48:08.102	2025-11-23 13:41:57.484
cmh36ahch004trx019dbv9xfm	Jacqueline Roy	jackieroy1@yahoo.com	07456611415	1.8T Excavator	I am looking for hire for a period of a week.  Thursday 30th October 9am latest delivery to Wednesday 5th November pick up at 5pm.  I live just outside Strachan.  Could you provide a quote for the week please.  Many thanks Jackie	t	2025-10-23 08:41:15.089	2025-11-23 13:41:59.705
cmh1r0t8k004rrx01bgs178uc	David Barron	davidcbarron1@gmail.com	07966619959	timberwolf 6" chipper	Need a chipper to chip brash from a couple of trees I am taking down. \n\nJust outside Inverurie \n\nMany thanks\n\nDave Barron	t	2025-10-22 08:46:03.524	2025-11-23 13:42:01.448
cmh0rowbb004prx019juij6zl	Elizabeth McNeill	info@sweetdonsidecabins.com	07810100061	1.8T Excavator	Hi, could you please give me a quote to hire this digger for 3 days, drop off and pick up to Scotsbank AB36 8UR. Thank you	t	2025-10-21 16:17:01.08	2025-11-23 13:42:03.221
cmh0jk8qx004nrx01f188my7s	Grant mchardy	grant76.mchardy@gmail.com	07508490328	Pressure Washer with Attachments	Looking to fully pressure wash my lock block drive that is very mossy and around 20mtr square , will this be suitable and can you suggest any other equipment that can do the job robustly and efficiently. Regards	t	2025-10-21 12:29:26.985	2025-11-23 13:42:04.369
cmh0essbg004lrx01kgn1t8pf	Noel Johnson	noel76@hotmail.co.uk	07513009901	Whacker plate	It's just to compact a large area where I've put chuckies down.	t	2025-10-21 10:16:07.516	2025-11-23 13:42:06.414
cmgyti5sj004jrx01ubn2nsp4	Faith Mackenzie	faithnmackenzie@gmail.com	01330 833612	Floor sander	Hire a floor sander	t	2025-10-20 07:32:13.651	2025-11-23 13:42:07.917
cmgw4df4v004hrx01stnqdv9y	Cynthia Fulton	cynthiafultonc22@gmail.com	09830152514	I can improve your SEO traffic by 3x	Hello,\n\nI hope you are doing well.\n\nI was checking your website and saw you have a good design and it looks great, but it's not AI optimized likechatgpt ,‎Google Gemini and perplexity other major AI.\n\nPlease let me tell you some of the techniques that I can use below to help you get a better result on  major AI:\n\n1. AI keyword clustering\n2. Semantic SEO with natural language optimization\n3. Entity SEO (for E-E-A-T and AI search ranking)\n4. AI image compression & enhancement\n5. Alt tag generation via vision AI\n6. AI chatbot for 24/7 consultation booking, common FAQs, service guides\n7. Lead qualification + calendar integration\n8. Dynamic homepage & blog content generation\n9. Auto-update blogs\n10.AI-based user behavior analysis\n11.Scroll maps & click tracking to find weak spots\n12.Funnel optimization suggestions\n13.Core Web Vitals optimization via AI suggestions\n14.Lazy loading images, script deferrals using AI-based audits\n15.AI-based CDN selection & optimization\n16.Optimize for Google Lens and Siri/Alexa-based search\nIt will show you exactly what needs to be done to move you up in the rankings dramatically\n17.Structured data markup with AI tools\n18.Image naming, alt text, schema via AI\n\n\nFor service details, please email me back or contact WhatsApp,Google meet, Zoom for project discussion. You can see our rates on our website.\n\nThank you kindly for your time and consideration,\n\nKindest regards,\nCynthia Fulton	t	2025-10-18 10:13:09.727	2025-11-23 13:42:09.879
cmic48gym00ehrx01jpx7h4vc	Euan Thomson	ejthomson297@gmail.com	07584197545	1.8T Excavator	Quote for digger hire please. Thanks.	f	2025-11-23 19:33:19.966	2025-11-23 19:33:19.966
cmik1gybx00ejrx01d4j75qy4	Neil Robertson	neillie@outlook.com	\N	800Kg Tracked Dumper	Looking to move some stones on steep slopes, and interested in a week rental rate please.\nProbably before Christmas or between Christmas and New Year.	f	2025-11-29 08:38:06.285	2025-11-29 08:38:06.285
cmikfpqty00elrx014ks5bnb0	Chris MacKinnon	chris.w.mackinnon@gmail.com	07955324152	Petrol driven ‘Turf Cutter’	Afternoon, looking for a ball park quote on your hire turf cutter, anything up to a one week hire would suffice.\n\nAlso querying terms on hire - is this collection only or do APH have chargeable availability for drop/collect within say a 25 mile radius (AB45 2LF Ladysbridge, Banff)\n\nIf you could get back to me, I would be glad to hear from you.\n\nChris MacKinnon\n\n(Not availible on phone right now, currently offshore)	f	2025-11-29 15:16:51.094	2025-11-29 15:16:51.094
cmj5ha5c30000rx01u3b8uvcl	James Knowlson	jknowlson18@gmail.com	07981800365	petrol stump grinder	What dates do you have available are you closed for christmas season for the stump grinder a d what are day rates for it	f	2025-12-14 08:43:52.323	2025-12-14 08:43:52.323
cmj5mobj60002rx01embwfnk1	James Gibb	jamesgibbsco@gmail.com	07481623650	Floor and Stone Saws	Looking to hire for 1 day on a garden project	f	2025-12-14 11:14:51.618	2025-12-14 11:14:51.618
cmj9vunr60000rx014cdv02mw	Stewart MacDearmid	smacdearmid82@gmail.com	07766613015	vibrating plate	Hire of vibrating plate today. Thank you	f	2025-12-17 10:42:48.636	2025-12-17 10:42:48.636
cmjciv7990000rx01wo64cyjg	Michelle Dunbar	mmbarclaydunbar@outlook.com	07769686836	Micro Excavator	Micro digger wanted just for a few hours for a job	f	2025-12-19 07:02:37.436	2025-12-19 07:02:37.436
cmjfp9f4a0000rx01vqardihw	Gary Donald	gary.donut@sky.com	07759872971	Rollers 800mm and 1200mm	Looking for price so I can calculate my project costs	f	2025-12-21 12:24:57.031	2025-12-21 12:24:57.031
cmjh7gnko0000rx01jbow7p75	Steven Hosie	steven.hosie@yahoo.co.uk	07469353631	industrial dehumidifier	Can you give me price and availability of 2 units (immediate hire) for 20 days minimum	f	2025-12-22 13:42:13.847	2025-12-22 13:42:13.847
cmjhqyimh0000rx01r3dpa8c7	Steven Hosie	steven.hosie@yahoo.co.uk	07469353631	industrial dehumidifier	Can you give me a quote for 2 Industrial dehumidifiers 60L/day.  Please confirm what the minimum temperature that it operates at.  I plan to use it in a house which doesn't have heating.	f	2025-12-22 22:47:59.93	2025-12-22 22:47:59.93
\.


--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Equipment" (id, name, description, specifications, "dailyRate", "weeklyRate", "monthlyRate", available, "createdAt", "updatedAt") FROM stdin;
cmbsmtpm90018qq2w1vd2xnb1	Lighting Tower and Generator	Mobile lighting tower with integrated generator.	\N	\N	\N	\N	t	2025-06-12 00:20:06.513	2025-11-23 16:32:24.07
cmbta7aga000lod01v3fq50tc	stihl post hole auger	stihl post hole auger can come with a range of augers for 100mm to 250mm	null	\N	\N	\N	t	2025-06-12 11:14:31.21	2025-11-23 16:32:42.007
cmbvcy847003npm01b6vapi0i	concrete finishing tools	magic screeds \npower floats \nbull floats steel and magnesium \nconcrete brushes \nconcrete pokers	null	\N	\N	\N	t	2025-06-13 22:06:59.479	2025-06-13 22:06:59.479
cmbsmtpnb001wqq2wkk01o884	6 Ton Straight Tip Dumper	6 Ton capacity straight tip dumper.	\N	\N	\N	\N	t	2025-06-12 00:20:06.551	2025-06-13 21:20:22.637
cmbsmtpn6001tqq2wdcaasd6q	3 Ton Swivel Dumper	3 Ton capacity swivel dumper.	\N	\N	\N	\N	t	2025-06-12 00:20:06.546	2025-06-13 21:21:09.499
cmbsmtpme001bqq2w49907dk2	Rollers 800mm and 1200mm	Rollers available in 800mm and 1200mm widths.	\N	\N	\N	\N	t	2025-06-12 00:20:06.518	2025-06-13 21:22:55.284
cmiby1rn200dgrx010ldlgr33	tipping trailer with mesh sides	tipping trailer 8x5 with mesh sides electric tipping gear \ngross weight 2700kg	null	\N	\N	\N	t	2025-11-23 16:40:09.519	2025-11-23 16:40:09.519
cmiby3xka00dnrx019ckx7utp	14 ft flat bed drop side trailer LM146	14ft flat bed drop side trailer twin axel 14x5 \ngross weight 3500kg	null	\N	\N	\N	t	2025-11-23 16:41:50.506	2025-11-23 16:41:50.506
cmbsmtply0012qq2w6i8cywvq	Cement Mixers	Cement mixers for concrete and mortar.	\N	\N	\N	\N	t	2025-06-12 00:20:06.503	2025-06-13 22:08:25.725
cmbsmtpkn000eqq2w0p8wp59i	Laser Level	Laser level for accurate measurements.	\N	\N	\N	\N	t	2025-06-12 00:20:06.455	2025-06-13 22:10:09.968
cmbsmtpm40015qq2wvcburire	Floor and Stone Saws	Saws for cutting floors and stone.	\N	\N	\N	\N	t	2025-06-12 00:20:06.509	2025-06-13 22:10:27.026
cmibw6acr008hrx01zqdaevit	propane torch	propane torch to screw onto propane gas bottle	null	\N	\N	\N	t	2025-11-23 15:47:41.163	2025-11-23 15:47:41.163
cmepucukl0021rx01idnubi22	petrol stump grinder	petrol pedestrian stump grinder	null	\N	\N	\N	t	2025-08-24 15:26:45.189	2025-08-24 15:26:45.189
cmiby7qst00e4rx01vv3sebyk	enerpac p80 hydraulic hand pump	enerpac p80 hydraulic hand pump	null	\N	\N	\N	t	2025-11-23 16:44:48.366	2025-11-23 16:44:48.366
cmbsmtpn1001qqq2w0ax6z7ia	1 Ton High Tip Dumper	1 Ton capacity high tip dumper.	\N	\N	\N	\N	t	2025-06-12 00:20:06.541	2025-11-23 13:48:45.982
cmbsmtpmi001eqq2wk7cuwyts	Micro Excavator	Compact micro excavator.	\N	\N	\N	\N	t	2025-06-12 00:20:06.522	2025-11-23 13:48:59.511
cmbsmtpmw001nqq2wyr78m9mr	800Kg Tracked Dumper	800kg capacity tracked dumper.	\N	\N	\N	\N	t	2025-06-12 00:20:06.537	2025-06-13 21:25:39.03
cmbsmtpmn001hqq2wel56v5mj	1.8T Excavator	1.8 Ton mini excavator.	\N	\N	\N	\N	t	2025-06-12 00:20:06.527	2025-06-13 21:28:23.635
cmibx1opr009xrx01dflulth5	mobile dust extraction air mover	12" air mover dust extraction\npowerful fume extraction when serious air movement is needed \ndesigned to offer ventilation cooling and extraction \nfor spaces such as workshops factories and garages \ncomes with 5m of ducting	null	\N	\N	\N	t	2025-11-23 16:12:06.111	2025-11-23 16:12:06.111
cmd0n2juw000ble01a5asz888	timberwolf 6" chipper 	timberwolf 6" towable chipper \nweighs 750kg so can be towed behind most vehicles 	null	\N	\N	\N	t	2025-07-12 19:28:50.696	2025-11-23 16:33:53.712
cmibx8gj300a3rx01nl8o4dgi	industrial dehumidifier	industrial dehumidifier \nremoves up to 60 liters of moisture per day	null	\N	\N	\N	t	2025-11-23 16:17:22.096	2025-11-23 16:17:22.096
cmbsmtpld000qqq2wgg8zsioi	Trench Rammer and Vibrating Plate	Equipment for soil compaction in trenches and areas.	\N	\N	\N	\N	t	2025-06-12 00:20:06.481	2025-06-13 21:41:11.945
cmbsmtplj000tqq2w759t0yv6	Various Water Pumps	A range of water pumps for different applications.	\N	\N	\N	\N	t	2025-06-12 00:20:06.487	2025-06-13 21:43:25.77
cmbsmtplo000wqq2wrp3hhe9k	Various Generators	Various generators for portable power.	\N	\N	\N	\N	t	2025-06-12 00:20:06.492	2025-06-13 21:45:41.832
cmiby9bn500ebrx01k7fspn7k	10 tonne port a power kit	10 tonne port a power kit	null	\N	\N	\N	t	2025-11-23 16:46:02.033	2025-11-23 16:46:02.033
cmbsmtpmr001kqq2wa64ztoh6	3T Excavator	3 Ton excavator.	\N	\N	\N	\N	t	2025-06-12 00:20:06.532	2025-11-23 13:51:00.942
cmbsmtpl6000nqq2w42xwzmi1	Cobra Reel	Cobra reel for cable or pipe pushing.	\N	\N	\N	\N	t	2025-06-12 00:20:06.475	2025-06-13 21:52:16.789
cmbsmtpl1000kqq2w32hojb2w	Concrete Pokers Various Sizes	Concrete pokers in different sizes for compacting concrete.	\N	\N	\N	\N	t	2025-06-12 00:20:06.469	2025-06-13 21:53:47.465
cmbsmtpju0005qq2wrq76v1x8	1T High Tip Dumper	1 Ton capacity high tipping dumper.	\N	\N	\N	\N	t	2025-06-12 00:20:06.427	2025-11-23 13:51:25.065
cmibsfq6c006erx0101b5kvmn	quad bike with flail mower	quad bike 450cc \nautomatic gearbox \nflail mower 1200mm \npetrol driven	null	\N	\N	\N	t	2025-11-23 14:03:03.109	2025-11-23 14:03:03.109
cmibvlwtx007prx01bduc8pdl	plant trailer 3.5 tonnes	12x6 tri axle plant trailer	null	\N	\N	\N	t	2025-11-23 15:31:50.518	2025-11-23 15:31:50.518
cmiby6sbe00dxrx012jy05szs	enerpac panacake rams	5 tonnes to 50 tonnes	null	\N	\N	\N	t	2025-11-23 16:44:03.674	2025-11-23 16:44:03.674
cmibws7du009orx01s7euirwj	alloy scaffold tower	alloy tower \nheight 6.2 meters \nwidth 850mm \nlength 1800mm	null	\N	\N	\N	t	2025-11-23 16:04:43.747	2025-11-23 16:04:43.747
cmibxed5r00aarx01onf4zhkr	heavy duty industrial hoover	industrial hoover	null	\N	\N	\N	t	2025-11-23 16:21:57.664	2025-11-23 16:21:57.664
cmibxlpjn00agrx011qp9kywe	carpet cleaner	carpet cleaner with all the attachments for doing your stairs or sofa.\nwe also stock detergent to be able to provide you with low cost but highly effective detergent	null	\N	\N	\N	t	2025-11-23 16:27:40.307	2025-11-23 16:27:40.307
cmbsmtpk50008qq2wpqf7zdoc	Log Splitter Vertical and Horizontal Use	Log splitter for both vertical and horizontal operation.	\N	\N	\N	\N	t	2025-06-12 00:20:06.437	2025-11-23 16:30:54.769
cmbsmtpkc000bqq2w5gxxnclw	Pressure Washer with Attachments	High-pressure washer with various attachments.	\N	\N	\N	\N	t	2025-06-12 00:20:06.444	2025-11-23 16:31:15.253
cmbsmtpkv000hqq2wdv5wycm7	Strimmers, Blowers, Mowers, Turf Lifter and Scarifiers	Various gardening and landscaping tools.	\N	\N	\N	\N	t	2025-06-12 00:20:06.464	2025-11-23 16:31:30.868
cmbsmtplt000zqq2wdiczclax	SDS Drills and Breakers	SDS drills and breakers for concrete and masonry work.	\N	\N	\N	\N	t	2025-06-12 00:20:06.497	2025-11-23 16:31:59.863
cmibxzwot00d9rx01w5eadxxq	plant trailer	plant trailer 9x4 \ndouble axle \ngross weight 2700kg	null	\N	\N	\N	t	2025-11-23 16:38:42.75	2025-11-23 16:38:42.75
\.


--
-- Data for Name: EquipmentCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentCategory" (id, "equipmentId", "categoryId", "createdAt") FROM stdin;
cmbsmtpjz0007qq2wgxv2cl2v	cmbsmtpju0005qq2wrq76v1x8	cmbsmtpjm0001qq2w5kmqh5wx	2025-06-12 00:20:06.432
cmbsmtpk8000aqq2wc30s4pnm	cmbsmtpk50008qq2wpqf7zdoc	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 00:20:06.44
cmbsmtpkh000dqq2wlfej65e6	cmbsmtpkc000bqq2w5gxxnclw	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 00:20:06.45
cmbsmtpkr000gqq2wboe0yi5r	cmbsmtpkn000eqq2w0p8wp59i	cmbsmtpjs0004qq2ws6a8ly0q	2025-06-12 00:20:06.459
cmbsmtpky000jqq2wmydf9qbx	cmbsmtpkv000hqq2wdv5wycm7	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 00:20:06.466
cmbsmtpl4000mqq2wgpilsdwu	cmbsmtpl1000kqq2w32hojb2w	cmbsmtpjs0004qq2ws6a8ly0q	2025-06-12 00:20:06.472
cmbsmtpl9000pqq2w1s0j8nc1	cmbsmtpl6000nqq2w42xwzmi1	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 00:20:06.478
cmbsmtplg000sqq2wdss5m9gr	cmbsmtpld000qqq2wgg8zsioi	cmbsmtpjo0002qq2wr6bmaril	2025-06-12 00:20:06.484
cmbsmtpll000vqq2woqa0ttqj	cmbsmtplj000tqq2w759t0yv6	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 00:20:06.489
cmbsmtplq000yqq2wsyoect2t	cmbsmtplo000wqq2wrp3hhe9k	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 00:20:06.495
cmbsmtplv0011qq2wvjrgfgm9	cmbsmtplt000zqq2wdiczclax	cmbsmtpjs0004qq2ws6a8ly0q	2025-06-12 00:20:06.499
cmbsmtpm20014qq2wror2suqy	cmbsmtply0012qq2w6i8cywvq	cmbsmtpjs0004qq2ws6a8ly0q	2025-06-12 00:20:06.506
cmbsmtpm70017qq2wqyv37d16	cmbsmtpm40015qq2wvcburire	cmbsmtpjs0004qq2ws6a8ly0q	2025-06-12 00:20:06.511
cmbsmtpmb001aqq2wib39h2on	cmbsmtpm90018qq2w1vd2xnb1	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 00:20:06.516
cmbsmtpmg001dqq2wndw7t9p9	cmbsmtpme001bqq2w49907dk2	cmbsmtpjo0002qq2wr6bmaril	2025-06-12 00:20:06.52
cmbsmtpml001gqq2wt0ohzd4z	cmbsmtpmi001eqq2wk7cuwyts	cmbsmtpjh0000qq2wzn4l0df4	2025-06-12 00:20:06.525
cmbsmtpmp001jqq2wz51tmqv7	cmbsmtpmn001hqq2wel56v5mj	cmbsmtpjh0000qq2wzn4l0df4	2025-06-12 00:20:06.529
cmbsmtpmu001mqq2wsukwffas	cmbsmtpmr001kqq2wa64ztoh6	cmbsmtpjh0000qq2wzn4l0df4	2025-06-12 00:20:06.535
cmbsmtpmz001pqq2w0d9h70xt	cmbsmtpmw001nqq2wyr78m9mr	cmbsmtpjm0001qq2w5kmqh5wx	2025-06-12 00:20:06.539
cmbsmtpn4001sqq2wqnobdh39	cmbsmtpn1001qqq2w0ax6z7ia	cmbsmtpjm0001qq2w5kmqh5wx	2025-06-12 00:20:06.544
cmbsob31v0006qm015lq202nt	cmbsmtpnb001wqq2wkk01o884	cmbsmtpjm0001qq2w5kmqh5wx	2025-06-12 01:01:36.692
cmbsobb9e0008qm01h79pxr8w	cmbsmtpn6001tqq2wdcaasd6q	cmbsmtpjm0001qq2w5kmqh5wx	2025-06-12 01:01:47.33
cmbta7agf000nod01sq3wt08r	cmbta7aga000lod01v3fq50tc	cmbsmtpjq0003qq2w5q8ja5om	2025-06-12 11:14:31.215
cmbvcy84c003tpm014pu1p3jx	cmbvcy847003npm01b6vapi0i	cmbsmtpjs0004qq2ws6a8ly0q	2025-06-13 22:06:59.484
cmepucukr0025rx011zg2npy0	cmepucukl0021rx01idnubi22	cmbsmtpjq0003qq2w5q8ja5om	2025-08-24 15:26:45.195
cmibsfq6i006irx0112cuc6ed	cmibsfq6c006erx0101b5kvmn	cmibs9f2k006drx01jammxu00	2025-11-23 14:03:03.115
cmibvlwu2007trx01as64dxs9	cmibvlwtx007prx01bduc8pdl	cmibv8k1e007orx012nvp01s3	2025-11-23 15:31:50.523
cmibw6acx008lrx01yerf2qj4	cmibw6acr008hrx01zqdaevit	cmibw2n4t008grx018853fg7y	2025-11-23 15:47:41.169
cmibws7dz009urx01isats0fe	cmibws7du009orx01s7euirwj	cmibwndol009hrx01xbge6m9b	2025-11-23 16:04:43.752
cmibx1opw00a1rx01p25iteto	cmibx1opr009xrx01dflulth5	cmibwsuqv009wrx01trcxly66	2025-11-23 16:12:06.117
cmibx8gj700a7rx01kczh5mm5	cmibx8gj300a3rx01nl8o4dgi	cmibwsuqv009wrx01trcxly66	2025-11-23 16:17:22.1
cmibxed5w00aerx01h61quihn	cmibxed5r00aarx01onf4zhkr	cmibx9b0l00a9rx01zd3r85eq	2025-11-23 16:21:57.668
cmibxlpjt00akrx01sqid5ve7	cmibxlpjn00agrx011qp9kywe	cmibx9b0l00a9rx01zd3r85eq	2025-11-23 16:27:40.313
cmibxzwoz00ddrx015imvh6l2	cmibxzwot00d9rx01w5eadxxq	cmibv8k1e007orx012nvp01s3	2025-11-23 16:38:42.755
cmiby1rn600dkrx018cc7engm	cmiby1rn200dgrx010ldlgr33	cmibv8k1e007orx012nvp01s3	2025-11-23 16:40:09.522
cmiby3xke00drrx01wniind0c	cmiby3xka00dnrx019ckx7utp	cmibv8k1e007orx012nvp01s3	2025-11-23 16:41:50.51
cmiby6sbi00e1rx01v6ywc98t	cmiby6sbe00dxrx012jy05szs	cmibw2n4t008grx018853fg7y	2025-11-23 16:44:03.679
cmiby7qsy00e8rx01uducdrm8	cmiby7qst00e4rx01vv3sebyk	cmibw2n4t008grx018853fg7y	2025-11-23 16:44:48.37
cmiby9bn800efrx01ydjwg97x	cmiby9bn500ebrx01k7fspn7k	cmibw2n4t008grx018853fg7y	2025-11-23 16:46:02.036
\.


--
-- Data for Name: EquipmentDetail; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentDetail" (id, "equipmentId", content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: EquipmentImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentImage" (id, "equipmentId", "imageUrl", "altText", caption, "sortOrder", "isPrimary", "createdAt", "updatedAt") FROM stdin;
cmibxs6cd00borx014166h1mx	cmbta7aga000lod01v3fq50tc	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9285--2--1749847818845-490832172-v4c3eOoC92I54RQ1jCr22suUEpuNjT.jpg	\N	\N	2	t	2025-11-23 16:32:42.013	2025-11-23 16:32:42.013
cmibxs6cf00bqrx0173tx1kwr	cmbta7aga000lod01v3fq50tc	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9282--1--1749847574047-529228225-WgeANtuYDihHH9MXVfQUm79gWMeGlF.jpg	\N	\N	1	f	2025-11-23 16:32:42.015	2025-11-23 16:32:42.015
cmibxs6cg00bsrx01p87jdsy8	cmbta7aga000lod01v3fq50tc	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9281--1--1749847820034-646098210-tViPWMccYAJgu5dpTqvE1YILhW31kE.jpg	\N	\N	4	f	2025-11-23 16:32:42.016	2025-11-23 16:32:42.016
cmibxtpo400cdrx01uv9femnj	cmd0n2juw000ble01a5asz888	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/optimized-img-9617-1752349197580-112074350-SUVyH7NnoIg9mFaAIZal6J2tq2EhsF.jpeg	\N	\N	1	t	2025-11-23 16:33:53.716	2025-11-23 16:33:53.716
cmibxtpo500cfrx013b749a0o	cmd0n2juw000ble01a5asz888	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/optimized-img-9614--1--1752349196417-469369382-pTME3mKfSSq0Cung5Ha0WH2q7Bd0UV.jpeg	\N	\N	1	f	2025-11-23 16:33:53.717	2025-11-23 16:33:53.717
cmibxtpo600chrx0135gnafsp	cmd0n2juw000ble01a5asz888	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/optimized-img-9611-1752349198524-631583382-tkPql8UC87c02AhoTqajYHcFl0BLUW.jpeg	\N	\N	2	f	2025-11-23 16:33:53.718	2025-11-23 16:33:53.718
cmibxtpo700cjrx01pmkixdju	cmd0n2juw000ble01a5asz888	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/optimized-img-9612-1752349199300-854318815-UhtKpEToPwcNSlElMMJHCb2f018M96.jpeg	\N	\N	3	f	2025-11-23 16:33:53.719	2025-11-23 16:33:53.719
cmibxzwow00dbrx0124auh6d4	cmibxzwot00d9rx01w5eadxxq	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1013--1--1763915922280-464359818-upMmm1Qeaj6f3OERdUdE5KafretqOO.jpeg	\N	\N	0	t	2025-11-23 16:38:42.752	2025-11-23 16:38:42.752
cmbvbaa2d000upm01dk898deu	cmbsmtpnb001wqq2wkk01o884	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8599-1749849621233-105145863-fh4xRAf4nlg8pSld5aXCymLUqZbWYh.jpg	\N	\N	1	t	2025-06-13 21:20:22.646	2025-06-13 21:20:22.646
cmbvbaa2h000wpm01863hez1l	cmbsmtpnb001wqq2wkk01o884	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8603-1749849622074-864442383-UAUSSBP4JSRoaDI8C524UtavaTRcUX.jpg	\N	\N	2	f	2025-06-13 21:20:22.649	2025-06-13 21:20:22.649
cmbvbba7z000zpm01v7450yph	cmbsmtpn6001tqq2wdcaasd6q	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8596-1749849668926-23180208-GFahE9xzPT0I63qdo410LXZNsQUj1D.jpg	\N	\N	0	t	2025-06-13 21:21:09.503	2025-06-13 21:21:09.503
cmbvbdjui0012pm01wfgr65ug	cmbsmtpme001bqq2w49907dk2	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8593-1749849773749-987402555-4crezxTaCzxM2NzS73CQn9oqL70nxR.jpg	\N	\N	0	t	2025-06-13 21:22:55.29	2025-06-13 21:22:55.29
cmbvbdjuk0014pm0117kp4clm	cmbsmtpme001bqq2w49907dk2	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8592-1749849774674-809875710-HNYtJLMXTfbeEwM1dUbus4LLg3df6p.jpg	\N	\N	1	f	2025-06-13 21:22:55.292	2025-06-13 21:22:55.292
cmbvbh2700017pm01jk2pl61a	cmbsmtpmw001nqq2wyr78m9mr	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8653-1749849936523-767053702-ZoMzoyTMcAcqWhW3k5esQpJvVci7Rj.jpg	\N	\N	0	f	2025-06-13 21:25:39.036	2025-06-13 21:25:39.036
cmbvbh2720019pm01r0q74c8f	cmbsmtpmw001nqq2wyr78m9mr	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8647-1749849937479-199846652-nKoLPQqPqlYqYpb3oi1rLPsX97EiH7.jpg	\N	\N	1	f	2025-06-13 21:25:39.038	2025-06-13 21:25:39.038
cmbvbh274001bpm01gcpq3vwe	cmbsmtpmw001nqq2wyr78m9mr	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8657-1749849938379-625771837-cLMxQ0Pb9dDQvJrMTsiOqJWUfLO8Yt.jpg	\N	\N	2	t	2025-06-13 21:25:39.04	2025-06-13 21:25:39.04
cmbvbkl7a001epm01xzf42ji3	cmbsmtpmn001hqq2wel56v5mj	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8724-1749850102241-945708915-180cO8CnpZtyF0iJEA5lq5TSFq5jY4.jpg	\N	\N	0	t	2025-06-13 21:28:23.638	2025-06-13 21:28:23.638
cmbvbkl7b001gpm01iby00uln	cmbsmtpmn001hqq2wel56v5mj	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8720-1749850103108-473884450-Ox937mTcriTVJrZtVqXvULqEMkFQ9i.jpg	\N	\N	1	f	2025-06-13 21:28:23.64	2025-06-13 21:28:23.64
cmiby7qsw00e6rx016sfhl6ui	cmiby7qst00e4rx01vv3sebyk	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1018--1--1763916288031-726709393-GmnvIMAEN8OY5LxTkeL4XowDecOfVO.webp	\N	\N	0	t	2025-11-23 16:44:48.368	2025-11-23 16:44:48.368
cmiby9bn700edrx01hkv2jkv0	cmiby9bn500ebrx01k7fspn7k	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1017--1--1763916361547-716039764-nnDlK27K0fDrVirFN1SvYwTH782eT6.webp	\N	\N	0	t	2025-11-23 16:46:02.035	2025-11-23 16:46:02.035
cmbvc121b001vpm017se8jxbq	cmbsmtpld000qqq2wgg8zsioi	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8568-1749850870016-76079425-mgKsdnHzYl2UX4yaOFlg15nNqZJhH0.jpg	\N	\N	0	t	2025-06-13 21:41:11.952	2025-06-13 21:41:11.952
cmbvc121d001xpm0109jjvo2e	cmbsmtpld000qqq2wgg8zsioi	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8571-1749850871322-237480028-N7PpR0hfsetot3r61TClkqi2V3yjGd.jpg	\N	\N	1	f	2025-06-13 21:41:11.953	2025-06-13 21:41:11.953
cmbvc3xao0020pm01q1lpnq3g	cmbsmtplj000tqq2w759t0yv6	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8536-1749851003967-90088427-BFO2HKAOzvMC2pWvMIFE5Ngf1PDpAg.jpg	\N	\N	0	t	2025-06-13 21:43:25.776	2025-06-13 21:43:25.776
cmbvc3xap0022pm01ksalaap8	cmbsmtplj000tqq2w759t0yv6	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8534-1749851005206-101828884-GetMaKbxKzBWBFSY0aGGsw4ioJsrcd.jpg	\N	\N	1	f	2025-06-13 21:43:25.777	2025-06-13 21:43:25.777
cmbvc6ua30025pm01di4bddec	cmbsmtplo000wqq2wrp3hhe9k	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8538-1749851141191-887040580-RSd5iwS3SsbkHUUYUj6beT97FtvjRW.jpg	\N	\N	0	t	2025-06-13 21:45:41.836	2025-06-13 21:45:41.836
cmbvcfb14002jpm01762is4ls	cmbsmtpl6000nqq2w42xwzmi1	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8532-1749851536175-508549456-bCvoe1vR8ubGKgtCTARLRl5IpCcEPd.jpg	\N	\N	0	t	2025-06-13 21:52:16.792	2025-06-13 21:52:16.792
cmbvch8zy002mpm019mq7fncp	cmbsmtpl1000kqq2w32hojb2w	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8554-1749851626165-712822463-4AUSD1sQPb9lVwYcWuASgWwR8fOOdm.jpg	\N	\N	0	t	2025-06-13 21:53:47.47	2025-06-13 21:53:47.47
cmbvch900002opm01lvt0wk98	cmbsmtpl1000kqq2w32hojb2w	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8552-1749851626925-899431690-N1j0Hn5JP3J92CtIZucAQoOVGUKZ7R.jpg	\N	\N	1	f	2025-06-13 21:53:47.472	2025-06-13 21:53:47.472
cmiby1rn400dirx01dxv2b0qm	cmiby1rn200dgrx010ldlgr33	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1015--1--1763916009059-267209551-bDJT2tu728aiW4uR66wqoGYvB7NEDR.jpeg	\N	\N	0	t	2025-11-23 16:40:09.52	2025-11-23 16:40:09.52
cmiby3xkc00dprx01g6ym4ayq	cmiby3xka00dnrx019ckx7utp	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1014--1--1763916109916-728642707-ggLRbXu412WeFAeu2y3RZKbk90oJkP.jpeg	\N	\N	0	t	2025-11-23 16:41:50.509	2025-11-23 16:41:50.509
cmbvcy849003ppm01lsb5mpy5	cmbvcy847003npm01b6vapi0i	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9168-1749852417785-466908701-JIYrdwvihHz9GZAXzcsu0azWY70wFv.jpg	\N	\N	0	t	2025-06-13 22:06:59.481	2025-06-13 22:06:59.481
cmbvcy84b003rpm01n7410d9j	cmbvcy847003npm01b6vapi0i	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9170-1749852419024-763755608-MWdusb4UQfu7a9uJapY224tXdms96p.jpg	\N	\N	1	f	2025-06-13 22:06:59.483	2025-06-13 22:06:59.483
cmbvd02o4003wpm01zt73htj4	cmbsmtply0012qq2w6i8cywvq	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9279-1749850638651-649545632-jD5cH0UzAfZp2K0TGWnoGvuRH2HmTl.jpg	\N	\N	0	t	2025-06-13 22:08:25.732	2025-06-13 22:08:25.732
cmbvd02o7003ypm01tdn8ezx0	cmbsmtply0012qq2w6i8cywvq	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9276-1749850639433-827403688-h0rI6QI6McHtW2w1rP6legNu9ClgIH.jpg	\N	\N	1	f	2025-06-13 22:08:25.735	2025-06-13 22:08:25.735
cmbvd02o90040pm011deqz6zb	cmbsmtply0012qq2w6i8cywvq	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8576-1749850640099-495730182-lzc3ZjySigVAccD1agk8SHLujYTmBi.jpg	\N	\N	2	f	2025-06-13 22:08:25.737	2025-06-13 22:08:25.737
cmbvd2b3o0043pm01t2fvwmap	cmbsmtpkn000eqq2w0p8wp59i	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8516-1749851933051-344016109-bqTkR0xoKkmFa4g8CzCfYF3RjBlYHi.jpg	\N	\N	0	t	2025-06-13 22:10:09.972	2025-06-13 22:10:09.972
cmbvd2o9h0046pm01bhrqhiu0	cmbsmtpm40015qq2wvcburire	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8567-1749850415445-384967880-dFoq7dSHzJC4rtN3NoTQAwiM6Qdzp2.jpg	\N	\N	0	t	2025-06-13 22:10:27.03	2025-06-13 22:10:27.03
cmbvd2o9i0048pm01am9thu0o	cmbsmtpm40015qq2wvcburire	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8560-1749850416618-868456095-XZdrb0ecGNkileRRTTRlHBicVpVWcD.jpg	\N	\N	1	f	2025-06-13 22:10:27.031	2025-06-13 22:10:27.031
cmepucuko0023rx01k7edmt5l	cmepucukl0021rx01idnubi22	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/stump-grinder--1--1756049204662-550468211-XT4j0Kp60sEkstQ2NZBmSKigT50ink.webp	\N	\N	0	t	2025-08-24 15:26:45.192	2025-08-24 15:26:45.192
cmibrxcto005zrx01o366wzj4	cmbsmtpn1001qqq2w0ax6z7ia	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1008-1763905725429-522150465-YLaaQuk4gLspICOkK37gvFLuPwMtvk.jpeg	\N	\N	0	t	2025-11-23 13:48:45.996	2025-11-23 13:48:45.996
cmibrxn980062rx018gg4tajt	cmbsmtpmi001eqq2wk7cuwyts	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1009-1763905739161-669726336-3ylICwFTP0w90qWSiV5loSEVTaJ1Xj.jpeg	\N	\N	0	t	2025-11-23 13:48:59.516	2025-11-23 13:48:59.516
cmibs08ya0068rx01cnmztrbe	cmbsmtpmr001kqq2wa64ztoh6	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1011-1763905860563-246287886-I5hynMOn8Ex6lwTRcs9nSzMEMqWdVX.jpeg	\N	\N	0	t	2025-11-23 13:51:00.946	2025-11-23 13:51:00.946
cmibs0rkf006brx010am11ech	cmbsmtpju0005qq2wrq76v1x8	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1008-1763905884458-425155713-JRwvXg01BYP7fHvOfOZD6tnWOKGRqD.jpeg	\N	\N	0	t	2025-11-23 13:51:25.071	2025-11-23 13:51:25.071
cmibsfq6f006grx019yln1b58	cmibsfq6c006erx0101b5kvmn	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-0139-1763906582730-320272607-Qmv1S1KguXnpIt8cpHTf96G1FVsIYK.jpg	\N	\N	0	t	2025-11-23 14:03:03.111	2025-11-23 14:03:03.111
cmibvlwu0007rrx01p501noac	cmibvlwtx007prx01bduc8pdl	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1012-1763911909393-599587529-kxnHx6TSUN89W4bplmZFdHxrMui05w.jpeg	\N	\N	0	t	2025-11-23 15:31:50.52	2025-11-23 15:31:50.52
cmibw6acu008jrx01bbmp7rls	cmibw6acr008hrx01zqdaevit	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1016-1763912860539-236664512-WTZxC3XZ29cV3RVcKqsZmjauov1zXz.webp	\N	\N	0	t	2025-11-23 15:47:41.166	2025-11-23 15:47:41.166
cmibws7dw009qrx01o426a72d	cmibws7du009orx01s7euirwj	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-0907--1--1763913882760-210701041-06Xao1IxXLke71GWrZgt5GS6tNy7ex.jpeg	\N	\N	0	t	2025-11-23 16:04:43.749	2025-11-23 16:04:43.749
cmibws7dy009srx01uxtfy2rg	cmibws7du009orx01s7euirwj	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-0908--1--1763913883354-303342512-gYbP0EQpTwDlhz0xPSdOuKbFniAVFc.webp	\N	\N	1	t	2025-11-23 16:04:43.75	2025-11-23 16:04:43.75
cmibx1opu009zrx01ttfbd9kh	cmibx1opr009xrx01dflulth5	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1022-1763914325730-3311267-gLDsnQMbMn8QUScH7wRceCsKh7V0gL.webp	\N	\N	0	t	2025-11-23 16:12:06.114	2025-11-23 16:12:06.114
cmibx8gj500a5rx01hniqvbsx	cmibx8gj300a3rx01nl8o4dgi	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1023-1763914641538-580932187-NfFo7PChIKMrjN1UkeUN4WlfZwkltW.webp	\N	\N	0	t	2025-11-23 16:17:22.097	2025-11-23 16:17:22.097
cmibxed5u00acrx010n74mtyp	cmibxed5r00aarx01onf4zhkr	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1024-1763914917398-871544182-rDjLZWCJBtEyXBE4Y0BGqjxl04vqsG.jpeg	\N	\N	0	t	2025-11-23 16:21:57.666	2025-11-23 16:21:57.666
cmibxlpjq00airx01repedqrr	cmibxlpjn00agrx011qp9kywe	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1025-1763915259946-199023365-d6gif2nCO6N90zUgiMRMEnHMhlsDTU.webp	\N	\N	0	t	2025-11-23 16:27:40.31	2025-11-23 16:27:40.31
cmibxpvlh00anrx01j0pi0vrr	cmbsmtpk50008qq2wpqf7zdoc	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8587-1749852157122-796789342-WQgkrdWTxDG7HIOp6uW9LC3dQerQNZ.jpg	\N	\N	0	t	2025-11-23 16:30:54.773	2025-11-23 16:30:54.773
cmibxpvlj00aprx0114fp77n8	cmbsmtpk50008qq2wpqf7zdoc	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8584-1749852157906-612722139-NC7FkyzzkFRX54R6bF6ZcptqaQAbOf.jpg	\N	\N	1	f	2025-11-23 16:30:54.775	2025-11-23 16:30:54.775
cmibxpvlk00arrx017tw6kmck	cmbsmtpk50008qq2wpqf7zdoc	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8579-1749852158704-977045051-NkAUqbWII9MuiGxqKVzDLPbZPrNqKd.jpg	\N	\N	2	f	2025-11-23 16:30:54.776	2025-11-23 16:30:54.776
cmibxqbej00aurx01gh9x0lvy	cmbsmtpkc000bqq2w5gxxnclw	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8524-1749852037916-796664216-4dXZA4VYYDGuhTBja7I4UFRyU8vPFl.jpg	\N	\N	0	t	2025-11-23 16:31:15.259	2025-11-23 16:31:15.259
cmibxqbem00awrx01c38f19lh	cmbsmtpkc000bqq2w5gxxnclw	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8527-1749852038788-187778867-zjwNMQ9BkfYU8xLazQl6oOPooddLaO.jpg	\N	\N	1	f	2025-11-23 16:31:15.262	2025-11-23 16:31:15.262
cmibxqben00ayrx01y57vm5jq	cmbsmtpkc000bqq2w5gxxnclw	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8525-1749852039635-931214923-MrJ4YdV074HqIWwUC0AIt5C7Km06JC.jpg	\N	\N	2	f	2025-11-23 16:31:15.264	2025-11-23 16:31:15.264
cmibxqng900b1rx01o08p4kxe	cmbsmtpkv000hqq2wdv5wycm7	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8522-1749851742914-264997468-l43iRYu0x656ztEdKL2gUClsdb9MsX.jpg	\N	\N	0	t	2025-11-23 16:31:30.873	2025-11-23 16:31:30.873
cmibxqngb00b3rx01pqvi4t9m	cmbsmtpkv000hqq2wdv5wycm7	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8519-1749851743787-453655358-DhMDmWzQRyrLHq0TBAHXTYGftPuABE.jpg	\N	\N	1	f	2025-11-23 16:31:30.875	2025-11-23 16:31:30.875
cmibxqngc00b5rx0194zycoo0	cmbsmtpkv000hqq2wdv5wycm7	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8589-1749851842557-971641279-19MdJGeOgw74usV0NNUYR9XzmFS32W.jpg	\N	\N	2	f	2025-11-23 16:31:30.876	2025-11-23 16:31:30.876
cmibxqngd00b7rx01wivzytfd	cmbsmtpkv000hqq2wdv5wycm7	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8588-1749851843251-606884114-v7mh0iEjl9bagpQ3fbVz2LeJYhe6a3.jpg	\N	\N	3	f	2025-11-23 16:31:30.878	2025-11-23 16:31:30.878
cmibxr9tm00barx01u9srzvub	cmbsmtplt000zqq2wdiczclax	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8549--1--1749851406482-254090501-RdfMrXVnXhqqwZE8layNlLrgDyt7YO.jpg	\N	\N	3	t	2025-11-23 16:31:59.866	2025-11-23 16:31:59.866
cmibxr9tn00bcrx01vcoxu0sf	cmbsmtplt000zqq2wdiczclax	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9181-1749851404134-724872671-tGA7do65teCqyX9duES4VXHKpONxVr.jpg	\N	\N	1	f	2025-11-23 16:31:59.867	2025-11-23 16:31:59.867
cmibxr9to00berx0105qu0tfd	cmbsmtplt000zqq2wdiczclax	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-9179-1749851404967-616423552-6qif3rZQilOLRTl0C4uu9BENLwcDqu.jpg	\N	\N	1	f	2025-11-23 16:31:59.868	2025-11-23 16:31:59.868
cmibxr9tp00bgrx01o0e5xqq1	cmbsmtplt000zqq2wdiczclax	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8546--1--1749851405763-69720730-gMO0VkwHVEByaGkTeJpfBtW6z9OYNE.jpg	\N	\N	2	f	2025-11-23 16:31:59.869	2025-11-23 16:31:59.869
cmibxr9tq00birx01w7fg53sq	cmbsmtplt000zqq2wdiczclax	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/resizecom-IMG-8543--1--1749851407238-69504384-YWaUbtJvEkOXwxz0gJRYIB1Xuk2YLm.jpg	\N	\N	4	f	2025-11-23 16:31:59.871	2025-11-23 16:31:59.871
cmibxrsi100blrx01it0fwvhh	cmbsmtpm90018qq2w1vd2xnb1	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1010-1763905760771-207630271-AUZC5qeREdPA8Xj3TsjzuSLbzrQb3C.jpeg	\N	\N	0	t	2025-11-23 16:32:24.073	2025-11-23 16:32:24.073
cmiby6sbg00dzrx0132y4sfp3	cmiby6sbe00dxrx012jy05szs	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/IMG-1020--1--1763916243245-699733803-HxRnZykEyM8HhuvwKhHBYKVO5HRJ5l.webp	\N	\N	0	t	2025-11-23 16:44:03.676	2025-11-23 16:44:03.676
\.


--
-- Data for Name: Gallery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Gallery" (id, title, description, "imageUrl", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: GalleryImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GalleryImage" (id, title, "imageUrl", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SiteSettings" (id, key, value, description, category, "createdAt", "updatedAt") FROM stdin;
cmci9f0ve0028np01jtwo1mtw	floating_phone_enabled	true	Is floating phone button enabled?	floating	2025-06-29 22:46:46.827	2025-11-23 14:56:59.531
cmci9f0vt0029np01uyof6kyk	floating_phone_number	07312110885	Phone number for floating phone button.	floating	2025-06-29 22:46:46.828	2025-11-23 14:56:59.532
cmci9f0wb002anp01agf4yyif	floating_whatsapp_number	07312110885	WhatsApp number for floating WhatsApp button.	floating	2025-06-29 22:46:46.827	2025-11-23 14:56:59.532
cmci9f0we002bnp01ebyjwewb	floating_whatsapp_enabled	true	Is floating WhatsApp button enabled?	floating	2025-06-29 22:46:46.828	2025-11-23 14:56:59.533
cme0gqfx7000ole01so44zz57	contact_phone	+447312110885	Contact phone number displayed on the website.	contact	2025-08-06 21:11:10.34	2025-11-23 14:57:51.529
cme0gqfx5000nle01nuaelrgn	contact_address		Contact address displayed on the website.	contact	2025-08-06 21:11:10.34	2025-11-23 14:57:51.529
cme0gqfwj000mle01n3u531la	contact_email	info@aberdeenshireplanthire.co.uk	Contact email address displayed on the website.	contact	2025-08-06 21:11:10.34	2025-11-23 14:57:51.529
cmcgfmoh6000cnp017t4cjhf3	google_analytics_enabled	true	Is Google Analytics enabled?	analytics	2025-06-28 16:05:09.354	2025-06-29 23:48:00.475
cmcgfmohk000dnp0197qf5gcq	google_analytics_id	G-JNVJCPSD25	Google Analytics Measurement ID	analytics	2025-06-28 16:05:09.354	2025-06-29 23:48:00.475
cmcib323a0007pb01bfc6tddr	google_analytics_property_id	495026766	Google Analytics Property ID	analytics	2025-06-29 23:33:27.765	2025-06-29 23:48:00.475
cmbt6shm50001od01x6tc3yhr	site_description		A brief description of the website for SEO and metadata.	general	2025-06-12 09:39:01.783	2025-08-11 20:26:37.735
cmbt6shmh0003od01cnhzl8q1	site_name	Aberdeenshire Plant Hire	The name of the website, displayed in the title bar and other places.	general	2025-06-12 09:39:01.783	2025-08-11 20:26:37.735
cmbt6shlj0000od0160zrsedc	site_logo_size	large	The site logo size (small, medium, large).	general	2025-06-12 09:39:01.783	2025-08-11 20:26:37.736
cmbt6shm60002od01cjwkkx8s	site_logo	https://xrudmribd0kczaht.public.blob.vercel-storage.com/images/logoaber-1749721154389-430486848-t05182HkZAv67e8Gdx9CB36EM43jKY.png	The site logo URL, displayed in header and footer.	general	2025-06-12 09:39:01.783	2025-08-11 20:26:37.736
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, name, email, "emailVerified", image, password, "isAdmin", "createdAt", "updatedAt") FROM stdin;
cmbsmtpqx001zqq2wenojt3v5	Admin User	info@aberdeenshireplanthire.co.uk	\N	\N	$2b$10$Es.PiDBFi25mbxX5MiCF/OoJPsNXhw.0pBdAwvyO4OKDaIMrrFEmm	t	2025-06-12 00:20:06.681	2025-06-12 00:44:56.42
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: AuditLog AuditLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: ContactSubmission ContactSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContactSubmission"
    ADD CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY (id);


--
-- Name: EquipmentCategory EquipmentCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentCategory"
    ADD CONSTRAINT "EquipmentCategory_pkey" PRIMARY KEY (id);


--
-- Name: EquipmentDetail EquipmentDetail_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentDetail"
    ADD CONSTRAINT "EquipmentDetail_pkey" PRIMARY KEY (id);


--
-- Name: EquipmentImage EquipmentImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentImage"
    ADD CONSTRAINT "EquipmentImage_pkey" PRIMARY KEY (id);


--
-- Name: Equipment Equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Equipment"
    ADD CONSTRAINT "Equipment_pkey" PRIMARY KEY (id);


--
-- Name: GalleryImage GalleryImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GalleryImage"
    ADD CONSTRAINT "GalleryImage_pkey" PRIMARY KEY (id);


--
-- Name: Gallery Gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Gallery"
    ADD CONSTRAINT "Gallery_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: EquipmentCategory_equipmentId_categoryId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "EquipmentCategory_equipmentId_categoryId_key" ON public."EquipmentCategory" USING btree ("equipmentId", "categoryId");


--
-- Name: EquipmentDetail_equipmentId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "EquipmentDetail_equipmentId_key" ON public."EquipmentDetail" USING btree ("equipmentId");


--
-- Name: EquipmentImage_equipmentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EquipmentImage_equipmentId_idx" ON public."EquipmentImage" USING btree ("equipmentId");


--
-- Name: EquipmentImage_equipmentId_sortOrder_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EquipmentImage_equipmentId_sortOrder_idx" ON public."EquipmentImage" USING btree ("equipmentId", "sortOrder");


--
-- Name: Equipment_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Equipment_name_key" ON public."Equipment" USING btree (name);


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: SiteSettings_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SiteSettings_key_key" ON public."SiteSettings" USING btree (key);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EquipmentCategory EquipmentCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentCategory"
    ADD CONSTRAINT "EquipmentCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EquipmentCategory EquipmentCategory_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentCategory"
    ADD CONSTRAINT "EquipmentCategory_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EquipmentDetail EquipmentDetail_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentDetail"
    ADD CONSTRAINT "EquipmentDetail_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EquipmentImage EquipmentImage_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EquipmentImage"
    ADD CONSTRAINT "EquipmentImage_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

