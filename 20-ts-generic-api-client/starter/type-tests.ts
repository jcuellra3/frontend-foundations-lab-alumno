import { parsePage, requestJson, type Page, type Parser } from './api-client.js';
import { getProducts, parseProduct, type Product } from './product.js';

const parser: Parser<Product> = parseProduct;
const pageParser: Parser<Page<Product>> = parsePage(parser);
void pageParser;

async function check(): Promise<void> {
  const product = await requestJson('/product', { parser });
  product.id.toUpperCase();
  const page = await getProducts();
  page.items[0]?.price.toFixed(2);

  // @ts-expect-error El parser de Product no produce string.
  const text: string = product;
  void text;

  // @ts-expect-error Los items de Page son de solo lectura.
  page.items.push(product);
  // @ts-expect-error Los metadatos de Page son de solo lectura.
  page.meta.page = 2;
}
void check;
