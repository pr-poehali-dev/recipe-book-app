import { useState } from "react";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCardUpdated";
import RecipeFilters from "@/components/RecipeFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const featuredRecipes = [
  {
    id: "1",
    title: "Классическая паста Карбонара",
    description:
      "Нежная паста с кремовым соусом, беконом и пармезаном. Оригинальный рецепт из Италии.",
    image: "/placeholder.svg",
    cookingTime: "25 мин",
    difficulty: "Легко",
    rating: 4.8,
    reviewsCount: 156,
    category: "Паста",
  },
  {
    id: "2",
    title: "Шоколадный фондан",
    description:
      "Невероятно нежный десерт с жидким шоколадным центром. Идеально для романтического ужина.",
    image: "/placeholder.svg",
    cookingTime: "35 мин",
    difficulty: "Средне",
    rating: 4.9,
    reviewsCount: 89,
    category: "Десерты",
  },
  {
    id: "3",
    title: "Азиатский вок с курицей",
    description:
      "Яркое блюдо с овощами и курицей в ароматном соусе. Здорово, вкусно и быстро.",
    image: "/placeholder.svg",
    cookingTime: "20 мин",
    difficulty: "Легко",
    rating: 4.7,
    reviewsCount: 203,
    category: "Азиатская",
  },
  {
    id: "4",
    title: "Минестроне с базиликом",
    description:
      "Питательный овощной суп с бобовыми и макаронами. Классика итальянской кухни.",
    image: "/placeholder.svg",
    cookingTime: "45 мин",
    difficulty: "Легко",
    rating: 4.6,
    reviewsCount: 124,
    category: "Супы",
  },
  {
    id: "5",
    title: "Классический цезарь",
    description:
      "Хрустящие листья романо, анчоусы, пармезан и классическая заправка. Лучший салат всех времен.",
    image: "/placeholder.svg",
    cookingTime: "15 мин",
    difficulty: "Легко",
    rating: 4.5,
    reviewsCount: 78,
    category: "Салаты",
  },
  {
    id: "6",
    title: "Курица в медово-горчичной глазури",
    description:
      "Сочная курица с золотистой корочкой и невероятно ярким вкусом. Просто в приготовлении.",
    image: "/placeholder.svg",
    cookingTime: "50 мин",
    difficulty: "Средне",
    rating: 4.8,
    reviewsCount: 167,
    category: "Мясо",
  },
];

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipe(recipeId);
    // В реальном приложении здесь был бы переход на страницу рецепта
    console.log("Открываем рецепт:", recipeId);
  };

  const handleFiltersChange = (filters: any) => {
    console.log("Фильтры изменены:", filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-purple-50 text-purple-700 border-purple-200"
          >
            🍳 Лучшие рецепты
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Откройте для себя
            <span className="text-purple-600 block">мир вкусов</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Тысячи проверенных рецептов с пошаговыми инструкциями, рейтингами и
            отзывами от настоящих кулинаров
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                placeholder="Поиск рецептов..."
                className="pl-10 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="mr-4"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-purple-50"
            >
              Мясо
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-purple-50"
            >
              Десерты
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-purple-50"
            >
              Салаты
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-purple-50"
            >
              Паста
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-purple-50"
            >
              Азиатская
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t">
          <div className="max-w-4xl mx-auto">
            <RecipeFilters onFiltersChange={handleFiltersChange} />
          </div>
        </section>
      )}

      {/* Featured Recipes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Популярные рецепты
              </h2>
              <p className="text-gray-600">Любимые блюда нашего сообщества</p>
            </div>
            <Button variant="outline" className="hidden sm:flex">
              Смотреть все
              <Icon name="ArrowRight" className="ml-2" size={16} />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                onRecipeClick={handleRecipeClick}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button variant="outline">Смотреть все рецепты</Button>
          </div>
        </div>
      </section>

      {/* My Notes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Мои кулинарные заметки
          </h2>
          <p className="text-gray-600 mb-8">
            Сохраняйте любимые рецепты, делайте заметки и создавайте собственную
            коллекцию
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Icon
                name="Heart"
                className="mx-auto mb-3 text-red-500"
                size={24}
              />
              <h3 className="font-semibold mb-2">Избранные рецепты</h3>
              <p className="text-sm text-gray-600">
                Сохраняйте понравившиеся рецепты одним кликом
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Icon
                name="StickyNote"
                className="mx-auto mb-3 text-yellow-500"
                size={24}
              />
              <h3 className="font-semibold mb-2">Личные заметки</h3>
              <p className="text-sm text-gray-600">
                Добавляйте свои комментарии и изменения к рецептам
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Icon
                name="ShoppingCart"
                className="mx-auto mb-3 text-green-500"
                size={24}
              />
              <h3 className="font-semibold mb-2">Список покупок</h3>
              <p className="text-sm text-gray-600">
                Автоматически создавайте списки ингредиентов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                2,847
              </div>
              <div className="text-gray-600">Рецептов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                15,692
              </div>
              <div className="text-gray-600">Отзывов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">Средний рейтинг</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                8,542
              </div>
              <div className="text-gray-600">Пользователей</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Icon name="ChefHat" className="text-purple-400" size={28} />
                <span className="ml-2 text-xl font-semibold">Рецепты</span>
              </div>
              <p className="text-gray-400">
                Лучшие рецепты от профессиональных поваров и любителей
                кулинарии.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Категории</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Завтраки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Обеды
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ужины
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Десерты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Помощь</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Поддержка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Соцсети</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon name="Instagram" size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon name="Youtube" size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon name="Facebook" size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Рецепты. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
