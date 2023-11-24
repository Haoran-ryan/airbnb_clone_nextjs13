import React from 'react';
import ListingClient from './ListingClient';
import getListingById from '@/app/actions/getListingById';
import getCurrentUser from '@/app/actions/getCurrentUser';
import EmptyState from '@/app/components/EmptyState';

async function ListingPage({
	params
}) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();
	if (!listing) {
		return <EmptyState />
	}
	return (
		<ListingClient 
			listing = { listing }
			curentUser = { currentUser }
		/>
	);
}

export default ListingPage;