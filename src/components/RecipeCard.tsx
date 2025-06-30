import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
  cookingTime: string;
  difficulty: string;
  rating: number;
  reviewsCount: number;
  category: string;
}

export default function RecipeCard({
  title,
  description,
  image,
  cookingTime,
  difficulty,
  rating,
  reviewsCount,
  category,
}: RecipeCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 hover:bg-white">
          {category}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 h-auto"
        >
          <Icon name="Heart" size={16} className="text-gray-600" />
        </Button>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Icon name="Clock" size={14} />
              <span>{cookingTime}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Icon name="ChefHat" size={14} />
              <span>{difficulty}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm font-medium text-gray-900">{rating}</span>
            <span className="text-sm text-gray-500">({reviewsCount} отз.)</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-purple-600 border-purple-600 hover:bg-purple-50"
          >
            Посмотреть
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
