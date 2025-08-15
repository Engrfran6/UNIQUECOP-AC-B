import {uploadAllProducts} from "@/data/data";
import {collection, doc, writeBatch} from "firebase/firestore";
import {db} from "./firebase";

export async function uploadAllGroupedProducts(): Promise<{success: number; errors: string[]}> {
  const batch = writeBatch(db);
  let success = 0;
  const errors: string[] = [];

  try {
    for (const [category, products] of Object.entries(uploadAllProducts)) {
      for (const product of products) {
        const itemsCollectionRef = collection(db, category);
        const docRef = doc(itemsCollectionRef);

        batch.set(docRef, {
          ...product,
          category: product.category || category,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        success++;
      }
    }

    await batch.commit();
    return {success, errors};
  } catch (batchError) {
    return {
      success: 0,
      errors: [`Batch commit failed: ${batchError}`],
    };
  }
}

export async function uploadSampleProducts(): Promise<{success: number; errors: string[]}> {
  return await uploadAllGroupedProducts();
}
