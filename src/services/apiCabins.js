import supabase, { supabaseUrl } from "./supabase";

const TABLE = "cabins";

export async function getCabins() {
  let { data, error } = await supabase.from(TABLE).select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be loading right now.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // 1. Create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // 2. Edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be created.");
  }

  // Upload the image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if an error occurred while uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image cannot be uploaded. Cabin failed to be created."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be deleted.");
  }

  return data;
}
