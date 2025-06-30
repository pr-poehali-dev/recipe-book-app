import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Icon name="ChefHat" className="text-purple-600" size={28} />
            <h1 className="text-xl font-semibold text-gray-900">Рецепты</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-900 font-medium border-b-2 border-purple-600 pb-1"
            >
              Главная
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Каталог
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Избранное
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Профиль
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Icon name="Search" size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Heart" size={18} />
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Icon name="User" size={18} className="mr-2" />
              Вход
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
