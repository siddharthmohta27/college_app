import { supabase } from "@/lib/supabase";

export async function uploadDatingPhoto(
  userId: string,
  file: File,
  folder: "dating-photos" | "avatars" = "dating-photos"
): Promise<{ url: string; path: string }> {
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const path = `${folder}/${userId}/${fileName}`;

  const { error } = await supabase.storage.from("avatars").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteDatingPhoto(path: string) {
  const { error } = await supabase.storage.from("avatars").remove([path]);
  if (error) throw error;
}

export async function uploadMultipleDatingPhotos(
  userId: string,
  files: File[],
  folder: "dating-photos" | "avatars" = "dating-photos"
): Promise<Array<{ url: string; path: string }>> {
  const results = [];
  for (const file of files) {
    const result = await uploadDatingPhoto(userId, file, folder);
    results.push(result);
  }
  return results;
}