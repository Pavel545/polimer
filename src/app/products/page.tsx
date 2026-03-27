import Products from "@/components/section/products/products";
import BreadCrumbs from "@/components/ui/BreadCrumbs/BreadCrumbs";


export default function Product() {
  return (
    <main>
      <BreadCrumbs items={[{ title: "Продукция" }]} />

      <Products />
    </main>
  );
}