import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface ParagraphData {
  id: number;
  module: number;
  paragraph: number;
  title: string;
  imageUrl: string;
}

const mockData: ParagraphData[] = [
  { id: 1, module: 1, paragraph: 1, title: 'Unit 1A - Present Simple', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/c699af0f-4d98-4110-bb61-aae947d728f4.jpg' },
  { id: 2, module: 1, paragraph: 2, title: 'Unit 1B - Present Continuous', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/6948411c-378a-47e9-a25f-07f30b2e187b.jpg' },
  { id: 3, module: 1, paragraph: 3, title: 'Unit 1C - Past Simple', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/8ccb5709-950f-4a4b-b96f-898c0c769e84.jpg' },
  { id: 4, module: 2, paragraph: 1, title: 'Unit 2A - Future Forms', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/c699af0f-4d98-4110-bb61-aae947d728f4.jpg' },
  { id: 5, module: 2, paragraph: 2, title: 'Unit 2B - Modal Verbs', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/6948411c-378a-47e9-a25f-07f30b2e187b.jpg' },
  { id: 6, module: 2, paragraph: 3, title: 'Unit 2C - Conditionals', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/8ccb5709-950f-4a4b-b96f-898c0c769e84.jpg' },
  { id: 7, module: 3, paragraph: 1, title: 'Unit 3A - Passive Voice', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/c699af0f-4d98-4110-bb61-aae947d728f4.jpg' },
  { id: 8, module: 3, paragraph: 2, title: 'Unit 3B - Reported Speech', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/6948411c-378a-47e9-a25f-07f30b2e187b.jpg' },
  { id: 9, module: 3, paragraph: 3, title: 'Unit 3C - Phrasal Verbs', imageUrl: 'https://cdn.poehali.dev/projects/26107cd9-5144-4b13-a612-8f1b937ad26c/files/8ccb5709-950f-4a4b-b96f-898c0c769e84.jpg' },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<ParagraphData | null>(null);

  const modules = Array.from(new Set(mockData.map(item => item.module))).sort();

  const filteredData = mockData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.paragraph.toString().includes(searchTerm);
    const matchesModule = selectedModule === 'all' || item.module.toString() === selectedModule;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Ответы по Английскому
          </h1>
          <p className="text-muted-foreground text-lg">
            Найдите нужный параграф и получите ответы
          </p>
        </header>

        <div className="mb-8 flex flex-col md:flex-row gap-4 animate-fade-in">
          <div className="relative flex-1">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск по названию или номеру параграфа..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-full md:w-[200px] h-12">
              <SelectValue placeholder="Модуль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все модули</SelectItem>
              {modules.map(module => (
                <SelectItem key={module} value={module.toString()}>
                  Модуль {module}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchTerm || selectedModule !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedModule('all');
              }}
              className="h-12"
            >
              <Icon name="X" size={20} className="mr-2" />
              Сбросить
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <Card
              key={item.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(item)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-secondary/50 rounded-t-lg overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Модуль {item.module}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="BookOpen" size={18} className="text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Параграф {item.paragraph}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Ничего не найдено
            </h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            {selectedImage && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedImage.title}
                  </DialogTitle>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="Layers" size={16} />
                      Модуль {selectedImage.module}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="BookOpen" size={16} />
                      Параграф {selectedImage.paragraph}
                    </span>
                  </div>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full rounded-lg"
                  />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;