import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useFavorites } from "@/hooks/useFavorites";

interface RecipeDetailProps {
  recipeId: string;
}

const mockRecipe = {
  id: "1",
  title: "Классическая паста Карбонара",
  description:
    "Нежная паста с кремовым соусом, беконом и пармезаном. Оригинальный рецепт из Италии.",
  image: "/placeholder.svg",
  cookingTime: "25 мин",
  prepTime: "10 мин",
  servings: 4,
  difficulty: "Легко",
  rating: 4.8,
  reviewsCount: 156,
  category: "Паста",
  cuisine: "Итальянская",
  calories: 520,
  author: {
    name: "Анна Петрова",
    avatar: "/placeholder.svg",
    level: "Шеф-повар",
  },
  ingredients: [
    { name: "Спагетти", amount: "400", unit: "г" },
    { name: "Бекон", amount: "200", unit: "г" },
    { name: "Яйца", amount: "3", unit: "шт" },
    { name: "Пармезан тертый", amount: "100", unit: "г" },
    { name: "Чеснок", amount: "2", unit: "зубчика" },
    { name: "Оливковое масло", amount: "2", unit: "ст.л." },
    { name: "Черный перец", amount: "по вкусу", unit: "" },
    { name: "Соль", amount: "по вкусу", unit: "" },
  ],
  instructions: [
    {
      step: 1,
      title: "Подготовка ингредиентов",
      description:
        "Нарежьте бекон небольшими кубиками. Натрите пармезан на мелкой терке. Разбейте яйца в миску и слегка взбейте вилкой.",
      time: "5 мин",
      image: "/placeholder.svg",
    },
    {
      step: 2,
      title: "Варим пасту",
      description:
        "Поставьте большую кастрюлю с подсоленной водой на огонь. Когда вода закипит, добавьте спагетти и варите согласно инструкции на упаковке до состояния аль денте.",
      time: "10 мин",
      image: "/placeholder.svg",
    },
    {
      step: 3,
      title: "Готовим бекон",
      description:
        "На сковороде без масла обжарьте кубики бекона до золотистого цвета. Добавьте измельченный чеснок и готовьте еще 1 минуту.",
      time: "7 мин",
      image: "/placeholder.svg",
    },
    {
      step: 4,
      title: "Соединяем ингредиенты",
      description:
        "Слейте воду с пасты, оставив немного воды для соуса. Быстро смешайте горячую пасту с беконом, затем снимите с огня и добавьте яичную смесь, постоянно перемешивая.",
      time: "3 мин",
      image: "/placeholder.svg",
    },
  ],
  notes: [
    "Важно снять сковороду с огня перед добавлением яиц, чтобы они не свернулись",
    "Используйте только свежие яйца высокого качества",
    "Подавайте немедленно после приготовления",
  ],
  tags: ["быстро", "итальянская кухня", "паста", "бекон"],
};

const mockReviews = [
  {
    id: "1",
    user: { name: "Мария К.", avatar: "/placeholder.svg" },
    rating: 5,
    date: "2024-06-25",
    text: "Потрясающий рецепт! Получилось с первого раза. Семья в восторге, теперь готовлю каждую неделю.",
    helpful: 12,
  },
  {
    id: "2",
    user: { name: "Дмитрий С.", avatar: "/placeholder.svg" },
    rating: 4,
    date: "2024-06-20",
    text: "Хороший рецепт, но я добавил немного сливок для более кремовой текстуры. Рекомендую попробовать!",
    helpful: 8,
  },
  {
    id: "3",
    user: { name: "Елена М.", avatar: "/placeholder.svg" },
    rating: 5,
    date: "2024-06-18",
    text: "Точно следовала инструкции - получилось идеально! Спасибо за подробное описание каждого шага.",
    helpful: 15,
  },
];

export default function RecipeDetail({ recipeId }: RecipeDetailProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeStep, setActiveStep] = useState(1);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [servings, setServings] = useState(mockRecipe.servings);

  const adjustIngredients = (
    baseAmount: string,
    baseServings: number,
    newServings: number,
  ) => {
    const numericAmount = parseFloat(baseAmount);
    if (isNaN(numericAmount)) return baseAmount;
    return ((numericAmount * newServings) / baseServings).toFixed(1);
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRate?: (rating: number) => void,
  ) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={interactive ? 20 : 14}
        className={`${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-300" : ""}`}
        onClick={interactive ? () => onRate?.(i + 1) : undefined}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад к рецептам
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="secondary">{mockRecipe.category}</Badge>
                      <Badge variant="outline">{mockRecipe.cuisine}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {mockRecipe.title}
                    </h1>
                    <p className="text-gray-600 text-lg">
                      {mockRecipe.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFavorite(mockRecipe.id)}
                    className="ml-4"
                  >
                    <Icon
                      name="Heart"
                      size={16}
                      className={`mr-2 ${isFavorite(mockRecipe.id) ? "text-red-500 fill-current" : ""}`}
                    />
                    {isFavorite(mockRecipe.id) ? "В избранном" : "В избранное"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b">
                  <div className="text-center">
                    <Icon
                      name="Clock"
                      className="mx-auto mb-1 text-purple-600"
                      size={20}
                    />
                    <div className="text-sm font-medium">
                      {mockRecipe.cookingTime}
                    </div>
                    <div className="text-xs text-gray-500">Приготовление</div>
                  </div>
                  <div className="text-center">
                    <Icon
                      name="Users"
                      className="mx-auto mb-1 text-purple-600"
                      size={20}
                    />
                    <div className="text-sm font-medium">
                      {mockRecipe.servings} порций
                    </div>
                    <div className="text-xs text-gray-500">Количество</div>
                  </div>
                  <div className="text-center">
                    <Icon
                      name="ChefHat"
                      className="mx-auto mb-1 text-purple-600"
                      size={20}
                    />
                    <div className="text-sm font-medium">
                      {mockRecipe.difficulty}
                    </div>
                    <div className="text-xs text-gray-500">Сложность</div>
                  </div>
                  <div className="text-center">
                    <Icon
                      name="Zap"
                      className="mx-auto mb-1 text-purple-600"
                      size={20}
                    />
                    <div className="text-sm font-medium">
                      {mockRecipe.calories}
                    </div>
                    <div className="text-xs text-gray-500">Калорий</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={mockRecipe.author.avatar} />
                      <AvatarFallback>АП</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {mockRecipe.author.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {mockRecipe.author.level}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(mockRecipe.rating)}
                    </div>
                    <span className="font-medium">{mockRecipe.rating}</span>
                    <span className="text-gray-500">
                      ({mockRecipe.reviewsCount} отзывов)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={mockRecipe.image}
                alt={mockRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="List" size={20} />
                  <span>Пошаговые инструкции</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockRecipe.instructions.map((step, index) => (
                  <div
                    key={step.step}
                    className={`flex space-x-4 p-4 rounded-lg transition-colors ${
                      activeStep === step.step
                        ? "bg-purple-50 border border-purple-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          activeStep === step.step
                            ? "bg-purple-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{step.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {step.time}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={
                            activeStep === step.step ? "default" : "outline"
                          }
                          onClick={() => setActiveStep(step.step)}
                        >
                          {activeStep === step.step
                            ? "Текущий шаг"
                            : "Перейти к шагу"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={20} />
                  <span>Отзывы ({mockReviews.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Review */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Оставить отзыв</h4>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm">Оценка:</span>
                    {renderStars(newRating, true, setNewRating)}
                  </div>
                  <Textarea
                    placeholder="Поделитесь своим опытом приготовления..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="mb-3"
                  />
                  <Button size="sm">Опубликовать отзыв</Button>
                </div>

                <Separator />

                {/* Reviews List */}
                {mockReviews.map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>
                          {review.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {review.user.name}
                            </span>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{review.text}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Icon name="ThumbsUp" size={14} className="mr-1" />
                            Полезно ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon
                              name="MessageCircle"
                              size={14}
                              className="mr-1"
                            />
                            Ответить
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="ShoppingCart" size={20} />
                    <span>Ингредиенты</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="text-sm font-medium">
                      {servings} порций
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(servings + 1)}
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRecipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-gray-600">
                        {adjustIngredients(
                          ingredient.amount,
                          mockRecipe.servings,
                          servings,
                        )}{" "}
                        {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Добавить в список покупок
                </Button>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Lightbulb" size={20} />
                  <span>Полезные советы</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRecipe.notes.map((note, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon
                        name="Info"
                        size={16}
                        className="text-purple-600 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-600">{note}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Tag" size={20} />
                  <span>Теги</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockRecipe.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-purple-100"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
