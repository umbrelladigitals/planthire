const fs = require('fs');
const file = 'src/components/panel/ProductFormDialog.tsx';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(
  "              <div>\n                <Label htmlFor=\"name\"",
  "              <div>\n                <Label className=\"text-xs font-black uppercase tracking-widest text-slate-900 mb-2 block\">Category</Label>\n                <Controller\n                  name=\"categoryId\"\n                  control={form.control}\n                  render={({ field }) => (\n                    <select \n                      {...field} \n                      className=\"w-full h-12 rounded-none border-2 border-slate-300 focus-visible:ring-0 focus-visible:border-primary font-medium text-slate-900 uppercase bg-white px-3 mb-6 block\"\n                    >\n                      <option value=\"\">Uncategorized</option>\n                      {categories.map(c => (\n                        <option key={c.id} value={c.id}>{c.name}</option>\n                      ))}\n                    </select>\n                  )}\n                />\n              </div>\n              <div>\n                <Label htmlFor=\"name\""
);

fs.writeFileSync(file, data);
