import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Section } from "@/components/layout/section";
import WeekSelector from "@/components/WeekSelector";
import { useCartStore } from "@/zustand/useCartStore"; // Import the cart store

const RegularItemsPage: React.FC = () => {
  const [selectedWeeks, setSelectedWeeks] = useState<number | undefined>(1);
  const { addToCart } = useCartStore(); // Destructure the addToCart function

  const handleSliderChange = (value: number) => {
    setSelectedWeeks(value);
  };

  const [allSubscriptionSalads, setAllSubscriptionSalads] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/salads");
      const data = await response.json();
      setAllSubscriptionSalads(data);
    };

    fetchRecipes();
  }, []);

  const handleAddToCart = (salad: any) => {
    const itemToAdd = {
      productId: salad.id.toString(),
      lprice:
        selectedWeeks === 1
          ? salad.base_price.toString()
          : (salad.base_price * selectedWeeks * 0.9).toString(), // Example calculation for price based on weeks
      image: salad.image, // Assuming you add an imageSrc to each salad object
      title: salad.name,
      mallName: "Salad Shop", // Example mall name
      brand: "Fresh Salads", // Example brand
      category4: "샐러드", // Category for recipes
    };
    addToCart(itemToAdd); // Call the addToCart function from the cart store
  };

  return (
    <Section>
      <div className="pt-12">
        <WeekSelector
          subscriptionSalads={allSubscriptionSalads}
          onAddToCart={handleAddToCart}
        />
        {/* Pass handleAddToCart to WeekSelector */}
      </div>
    </Section>
  );
};

export default RegularItemsPage;
