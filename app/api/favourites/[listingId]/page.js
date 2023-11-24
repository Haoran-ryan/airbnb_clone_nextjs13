import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

// POST function
async function POST(req, res, { params }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return res.status(401).json({ error: 'Not authenticated' });
	}

	const { listingId } = params;

	if (!listingId || isNaN(listingId)) {
		return res.status(400).json({ error: 'Invalid listing id' });
	}

	let favouriteIds = [...(currentUser.favouriteIds || [])];
	favouriteIds.push(listingId);

	const user = await prisma.user.update({
		where: {
			id: currentUser.id
		},
		data: {
			favouriteIds
		}
	});

	return res.json(user);
};

// DELETE function
async function DELETE(req, res, { params }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return res.status(401).json({ error: 'Not authenticated' });
	}

	const { listingId } = params;

	if (!listingId || isNaN(listingId)) {
		return res.status(400).json({ error: 'Invalid listing id' });
	}

	let favouriteIds = [...(currentUser.favouriteIds || [])];
	favouriteIds = favouriteIds.filter(id => id !== listingId);

	const user = await prisma.user.update({
		where: {
			id: currentUser.id
		},
		data: {
			favouriteIds
		}
	});

	return res.json(user);
};

// Default export function
export default async function handler(req, res) {
	try {
		switch (req.method) {
			case 'POST':
				return await POST(req, res, { params: req.query });
			case 'DELETE':
				return await DELETE(req, res, { params: req.query });
			default:
				// Handle any other HTTP methods
				res.setHeader('Allow', ['POST', 'DELETE']);
				res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (error) {
		// Error handling
		res.status(500).json({ error: error.message || 'Server error' });
	}
}
