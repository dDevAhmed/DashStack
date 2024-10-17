import { collection, getDocs, doc, updateDoc, query, where, deleteDoc } from 'firebase/firestore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../firebase.config';

// Fetch products from Firebase
const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

// Update favorite status in Firebase
const updateFavoriteStatus = async ({ id, isFavorite }) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      isFavorite: isFavorite
    });
    console.log('product favored');
    
  } catch (error) {
    console.error("Error updating favorite status:", error);
    throw new Error("Failed to update favorite status");
  }
};

const deleteProduct = async ({ id }) => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    console.log('product deleted');
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export const useFavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFavoriteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
