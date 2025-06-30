import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface RecipeFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const categories = [
  { id: "breakfast", label: "Завтраки", icon: "Coffee" },
  { id: "lunch", label: "Обеды", icon: "Utensils" },
  { id: "dinner", label: "Ужины", icon: "ChefHat" },
  { id: "desserts", label: "Десерты", icon: "Cake" },
  { id: "snacks", label: "Закуски", icon: "Cookie" },
  { id: "drinks", label: "Напитки", icon: "Coffee" },
  { id: "salads", label: "Салаты", icon: "Salad" },
  { id: "soups", label: "Супы", icon: "Bowl" },
];

const cuisines = [
  "Русская",
  "Итальянская",
  "Французская",
  "Азиатская",
  "Американская",
  "Мексиканская",
  "Греческая",
  "Индийская",
];

const difficulties = [
  { id: "easy", label: "Легко" },
  { id: "medium", label: "Средне" },
  { id: "hard", label: "Сложно" },
];

const diets = [
  "Вегетарианская",
  "Веганская",
  "Безглютеновая",
  "Низкокалорийная",
  "Кето",
  "Палео",
];

export default function RecipeFilters({ onFiltersChange }: RecipeFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    [],
  );
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState([60]);
  const [rating, setRating] = useState([4]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(updated);
    onFiltersChange({ categories: updated });
  };

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCuisines, cuisine]
      : selectedCuisines.filter((c) => c !== cuisine);
    setSelectedCuisines(updated);
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    const updated = checked
      ? [...selectedDifficulties, difficulty]
      : selectedDifficulties.filter((d) => d !== difficulty);
    setSelectedDifficulties(updated);
  };

  const handleDietChange = (diet: string, checked: boolean) => {
    const updated = checked
      ? [...selectedDiets, diet]
      : selectedDiets.filter((d) => d !== diet);
    setSelectedDiets(updated);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedCuisines([]);
    setSelectedDifficulties([]);
    setSelectedDiets([]);
    setCookingTime([60]);
    setRating([4]);
    onFiltersChange({});
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedCuisines.length +
    selectedDifficulties.length +
    selectedDiets.length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <span>Фильтры</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Очистить
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Category Filters */}
        <div>
          <h4 className="font-medium mb-3">Категории</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={category.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Icon
                    name={category.icon as any}
                    size={16}
                    className="text-gray-500"
                  />
                  <span className="text-sm">{category.label}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Cooking Time */}
            <div>
              <h4 className="font-medium mb-3">Время приготовления</h4>
              <div className="px-2">
                <Slider
                  value={cookingTime}
                  onValueChange={setCookingTime}
                  max={180}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>5 мин</span>
                  <span>До {cookingTime[0]} мин</span>
                  <span>3 часа</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium mb-3">Минимальный рейтинг</h4>
              <div className="px-2">
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  max={5}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1 ⭐</span>
                  <span>От {rating[0]} ⭐</span>
                  <span>5 ⭐</span>
                </div>
              </div>
            </div>

            {/* Cuisines */}
            <div>
              <h4 className="font-medium mb-3">Кухня</h4>
              <div className="grid grid-cols-2 gap-3">
                {cuisines.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine}
                      checked={selectedCuisines.includes(cuisine)}
                      onCheckedChange={(checked) =>
                        handleCuisineChange(cuisine, checked as boolean)
                      }
                    />
                    <Label htmlFor={cuisine} className="text-sm cursor-pointer">
                      {cuisine}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className="font-medium mb-3">Сложность</h4>
              <div className="flex space-x-6">
                {difficulties.map((difficulty) => (
                  <div
                    key={difficulty.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={difficulty.id}
                      checked={selectedDifficulties.includes(difficulty.id)}
                      onCheckedChange={(checked) =>
                        handleDifficultyChange(
                          difficulty.id,
                          checked as boolean,
                        )
                      }
                    />
                    <Label
                      htmlFor={difficulty.id}
                      className="text-sm cursor-pointer"
                    >
                      {difficulty.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Diets */}
            <div>
              <h4 className="font-medium mb-3">Диеты</h4>
              <div className="grid grid-cols-2 gap-3">
                {diets.map((diet) => (
                  <div key={diet} className="flex items-center space-x-2">
                    <Checkbox
                      id={diet}
                      checked={selectedDiets.includes(diet)}
                      onCheckedChange={(checked) =>
                        handleDietChange(diet, checked as boolean)
                      }
                    />
                    <Label htmlFor={diet} className="text-sm cursor-pointer">
                      {diet}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
