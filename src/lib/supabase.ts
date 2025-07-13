import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://wipfdprsyyyhiheeoodd.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcGZkcHJzeXl5aGloZWVvb2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMTk3MzYsImV4cCI6MjA2NzY5NTczNn0.YcFxjUOe9aFSmqVQZwrhFbxjbnU0lARYVlQFEYA9E1Y";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (name: string, path: "brands" | "products" = "brands") => {
	const { data } = supabase.storage
		.from("belanja")
		.getPublicUrl(`public/${path}/${name}`);

	return data.publicUrl;
};

export const uploadFile = async (
	file: File,
	path: "brands" | "products" = "brands"
) => {
	const fileType = file.type.split("/")[1];
	const filename = `${path}-${Date.now()}.${fileType}`;

	await supabase.storage
		.from("belanja")
		.upload(`public/${path}/${filename}`, file, {
			cacheControl: "3600",
			upsert: false,
		});

	return filename;
};

export const deleteFile = async (
	filename: string,
	path: "brands" | "products" = "brands"
) => {
	await supabase.storage
		.from("belanja")
		.remove([`public/${path}/${filename}`]);
};
