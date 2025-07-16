import React from "react";
import { getLocationById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-location";
import { Tedit } from "@/types";

type Tparams = {
	id: string;
};

export default async function EditPage({ params }: Tedit) {
	const data = await getLocationById(params.id);

	if (!data) {
		return redirect("/dashboard/categories");
	}

	console.log(data);

	return <FormCategory type="EDIT" data={data} />;
}
