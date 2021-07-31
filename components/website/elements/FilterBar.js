import React from "react";
import { HorizontalList, ListItem } from "@/components/diginext/layout/ListLayout";
import { BS } from "@/components/diginext/elements/Splitters";

export const FilterBar = () => (
	<>
		<HorizontalList gutter={10}>
			<ListItem>{/* SORT */}</ListItem>
			<ListItem>{/* SEARCH */}</ListItem>
		</HorizontalList>
		<BS />
	</>
);
