import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from "react-hot-toast";

import useLoginModal from '@/app/hooks/useLoginModal';

const useFavourite = ({
	listingId,
	currentUser,
}) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavourited = useMemo(() =>{
		const list = currentUser?.favouriteIds || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavourite = useCallback(async (e) => {
		e.stopPropagation();

		if (!currentUser) {
			return loginModal.open();
		}

		try{
			let request;

			if (hasFavourited) {
				request = () => axios.delete(`/api/favourites/${listingId}`);

		} else {
			request = () => axios.post(`/api/favourites/${listingId}`);
			}

			await request();
			router.refresh()
			toast.success('success')
		} catch (err) {
			toast.error('Something went wrong');
		}
	}, [currentUser, hasFavourited, listingId, loginModal, router]);

	return { hasFavourited, toggleFavourite };
}

export default useFavourite;