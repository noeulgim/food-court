import { useSearchStore } from "@/zustand/useSearchStore";
import { Section } from "@/components/layout/section";
import { useCartStore } from "@/zustand/useCartStore";
import { useAuthStore } from "@/zustand/useAuthStore"; // Import the useAuthStore

const SearchPage: React.FC = () => {
  const { searchResults, searchTerm } = useSearchStore();
  const { addToCart } = useCartStore();
  const { user } = useAuthStore(); // Get user state from auth store

  const handleAddToCart = ({
    productId,
    lprice,
    image,
    title,
    mallName,
    brand,
    category4,
  }) => {
    if (!user) {
      alert("로그인 해야 추가"); // Alert if user is not logged in
      return;
    }

    addToCart({ productId, lprice, image, title, mallName, brand, category4 }); // Proceed to add to cart if user is logged in
  };

  return (
    <Section sectionTitle={searchTerm}>
      <div className="px-16 py-16">
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {searchResults.map((product) => (
              <div
                key={product.productId}
                className="group flex flex-col justify-between"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    alt={product.title}
                    src={product.image}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.lprice}
                  </p>
                  <p className="text-sm text-gray-500">{product.mallName}</p>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <p className="text-sm text-gray-500">{product.category4}</p>
                  <button
                    onClick={() =>
                      handleAddToCart({
                        productId: product.productId,
                        lprice: product.lprice,
                        image: product.image,
                        title: product.title,
                        mallName: product.mallName,
                        brand: product.brand,
                        category4: product.category4,
                      })
                    } // Use the new handler
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </Section>
  );
};

export default SearchPage;
