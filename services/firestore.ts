import { db } from "@/config/firebase.confitg";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// Tipos para manejar colecciones de datos específicos
type FirestoreData = { [key: string]: any };

const getCollectionRef = (collectionName: string) =>
  collection(db, collectionName);

// Manejo de errores centralizado
const handleError = (error: unknown, action: string) => {
  console.error(`Error en la acción ${action}:`, error);
  throw new Error(`Error al ${action} los datos.`);
};

// Función para agregar datos a una colección
export const addData = async (
  collectionName: string,
  data: FirestoreData
): Promise<string> => {
  try {
    const docRef = await addDoc(getCollectionRef(collectionName), data);
    return docRef.id;
  } catch (error) {
    handleError(error, "agregar");
    throw error; // Lanzamos el error para evitar que la función devuelva un valor no esperado
  }
};

// Función para obtener datos de una colección
export const getData = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const querySnapshot = await getDocs(getCollectionRef(collectionName));
    return querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return { id: doc.id, ...docData } as T; // Tipado explícito
    });
  } catch (error) {
    handleError(error, "obtener");
    return []; // Esto se añade por seguridad, pero no es necesario, ya que el error será lanzado.
  }
};

// Función para actualizar datos en una colección
export const updateData = async (
  collectionName: string,
  docId: string,
  newData: FirestoreData
): Promise<void> => {
  try {
    await setDoc(doc(db, collectionName, docId), newData, { merge: true });
  } catch (error) {
    handleError(error, "actualizar");
  }
};

// Función para eliminar un documento de una colección
export const deleteData = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    handleError(error, "eliminar");
  }
};
