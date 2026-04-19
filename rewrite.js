const fs = require('fs');
const file = 'src/components/panel/ProductFormDialog.tsx';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(
  "import { createEquipmentAction, updateEquipmentAction } from '@/actions/product-actions';",
  "import { createEquipmentAction, updateEquipmentAction, getCategoriesAction } from '@/actions/product-actions';"
);

data = data.replace(
  "available: boolean;\n}",
  "available: boolean;\n  categoryId?: string | null;\n}"
);

data = data.replace(
  "available: z.boolean(),",
  "available: z.boolean(),\n  categoryId: z.string().optional().or(z.literal('')),"
);

data = data.replace(
  "export function ProductFormDialog({ productToEdit, onFormSubmit }: ProductFormDialogProps) {",
  "export function ProductFormDialog({ productToEdit, onFormSubmit }: ProductFormDialogProps) {\n  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);\n\n  useEffect(() => {\n    getCategoriesAction().then(res => {\n      if (res.success && res.data) setCategories(res.data);\n    });\n  }, []);"
);

data = data.replace(
  /available: productToEdit.available,/g,
  "available: productToEdit.available,\n          categoryId: productToEdit.categoryId || \"\","
);

data = data.replace(
  /available: true,/g,
  "available: true,\n          categoryId: \"\","
);

data = data.replace(
  "available: values.available,",
  "available: values.available,\n        categoryId: values.categoryId || null,"
);

data = data.replace(
  "              <div className=\"space-y-2\">",
  "              <div className=\"space-y-2\">\n                <Label className=\"text-xs font-bold uppercase tracking-widest text-slate-500\">CATEGORY</Label>\n                <Controller\n                  name=\"categoryId\"\n                  control={form.control}\n                  render={({ field }) => (\n                    <select \n                      {...field} \n                      className=\"flex h-10 w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50\"\n                    >\n                      <option value=\"\">Uncategorized</option>\n                      {categories.map(c => (\n                        <option key={c.id} value={c.id}>{c.name}</option>\n                      ))}\n                    </select>\n                  )}\n                />\n              </div>\n              <div className=\"space-y-2\">"
);


fs.writeFileSync(file, data);
