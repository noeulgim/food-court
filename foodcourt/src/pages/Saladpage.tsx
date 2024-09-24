import { useState, useEffect } from "react";
import AddCartModal from "@/components/modal/AddCartModal";
import { Section } from "@/components/layout/section";

interface Salad {
  id: number;
  name: string;
  image: string;
  basePrice: number;
}

const SaladPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [allSubscriptionSalads, setAllSubscriptionSalads] = useState<Salad[]>(
    []
  );
  const [selectedSalad, setSelectedSalad] = useState<Salad | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/salads");
      const data: Salad[] = await response.json();
      setAllSubscriptionSalads(data);
    };
    fetchRecipes();
  }, []);

  return (
    <Section sectionTitle={`샐러드 ${allSubscriptionSalads.length}종`}>
      <div className="px-16 py-16">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allSubscriptionSalads.map((salad) => {
            return (
              <div key={salad.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={salad.name}
                    src={salad.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex flex-col justify-between">
                  <h3 className="text-sm text-gray-700">{salad.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    가격: {salad.basePrice}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOpen(true);
                    setSelectedSalad(salad);
                  }}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  장바구니에 추가
                </button>
                {selectedSalad && (
                  <AddCartModal
                    open={open}
                    onClose={() => setOpen(false)}
                    contents={selectedSalad}
                    children={undefined}
                    category="샐러드"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default SaladPage;
