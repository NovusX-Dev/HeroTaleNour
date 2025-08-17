import { type Story, type InsertStory, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Stories
  getAllStories(): Promise<Story[]>;
  getActiveStories(): Promise<Story[]>;
  getStoryById(id: string): Promise<Story | undefined>;
  createStory(story: InsertStory): Promise<Story>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  updateOrderPaymentIntent(id: string, paymentIntentId: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private stories: Map<string, Story>;
  private orders: Map<string, Order>;

  constructor() {
    this.stories = new Map();
    this.orders = new Map();
    this.initializeDefaultStory();
  }

  private initializeDefaultStory() {
    // Create the default Brazilian Amazon story
    const defaultStory: Story = {
      id: "amazon-adventure",
      title: "A Grande Aventura na Floresta Amazônica",
      description: "Uma jornada mágica pela Floresta Amazônica, onde [CHILD_NAME] conhece animais incríveis, aprende sobre a importância da natureza e descobre o verdadeiro significado da coragem e amizade.",
      content: [
        {
          pageNumber: 1,
          text: "Era uma vez [CHILD_NAME], uma criança corajosa de [CHILD_AGE] anos que vivia em uma cidade movimentada. Um dia, [CHILD_NAME] acordou com um barulho estranho vindo do quintal...",
          imagePrompt: "A child looking out the window curiously at their backyard with lush greenery"
        },
        {
          pageNumber: 2,
          text: "No quintal, [CHILD_NAME] encontrou uma borboleta azul brilhante que parecia mágica. A borboleta sussurrou: 'Você quer conhecer a maior floresta do mundo?'",
          imagePrompt: "A magical blue butterfly talking to a child in a garden setting"
        },
        {
          pageNumber: 3,
          text: "Num piscar de olhos, [CHILD_NAME] se viu no coração da Floresta Amazônica! As árvores eram gigantes verdes que tocavam as nuvens.",
          imagePrompt: "A child standing amazed among towering Amazon rainforest trees"
        },
        {
          pageNumber: 4,
          text: "'Oi, [CHILD_NAME]!' disse uma voz animada. Era Chico, um macaco-prego esperto que se tornou o primeiro amigo de [CHILD_NAME] na floresta.",
          imagePrompt: "A friendly capuchin monkey greeting a child in the Amazon rainforest"
        },
        {
          pageNumber: 5,
          text: "Chico mostrou para [CHILD_NAME] como balançar nos cipós e explicou que cada árvore da Amazônia é o lar de centenas de animais diferentes.",
          imagePrompt: "A child swinging on vines with a monkey guide through the rainforest canopy"
        },
        {
          pageNumber: 6,
          text: "Durante a aventura, [CHILD_NAME] conheceu Ianá, uma arara colorida que sabia contar histórias antigas dos povos da floresta.",
          imagePrompt: "A colorful macaw perched near a child, surrounded by vibrant rainforest flowers"
        },
        {
          pageNumber: 7,
          text: "'A floresta está em perigo', disse Ianá tristemente. 'Alguns homens querem cortar nossas árvores. Você pode nos ajudar, [CHILD_NAME]?'",
          imagePrompt: "A sad macaw explaining to a concerned child about deforestation in the background"
        },
        {
          pageNumber: 8,
          text: "[CHILD_NAME] sentiu o coração bater forte. 'Claro que vou ajudar! Mas o que eu posso fazer?'",
          imagePrompt: "A determined child with hands on hips, ready to help protect the forest"
        },
        {
          pageNumber: 9,
          text: "Chico e Ianá levaram [CHILD_NAME] até a Árvore Sagrada, onde morava a sábia Onça Pintada que guardava os segredos da floresta.",
          imagePrompt: "A child approaching a magnificent sacred tree with a wise jaguar resting beneath it"
        },
        {
          pageNumber: 10,
          text: "'Jovem [CHILD_NAME]', rugiu suavemente a Onça. 'A força para proteger a natureza está dentro do seu coração. Use sua coragem!'",
          imagePrompt: "A majestic jaguar speaking wisely to a child under the sacred tree"
        },
        {
          pageNumber: 11,
          text: "[CHILD_NAME] fechou os olhos e sentiu uma energia especial. Quando os abriu, suas mãos brilhavam com a luz verde da natureza!",
          imagePrompt: "A child with glowing green hands, surrounded by magical forest light"
        },
        {
          pageNumber: 12,
          text: "Com seus novos poderes, [CHILD_NAME] fez as árvores crescerem mais fortes e criou uma barreira mágica ao redor da floresta.",
          imagePrompt: "A child using magical powers to make trees grow and create a protective barrier"
        },
        {
          pageNumber: 13,
          text: "Todos os animais da Amazônia celebraram! [CHILD_NAME] havia salvado seu lar e aprendido que cada pessoa pode fazer a diferença.",
          imagePrompt: "Various Amazon animals celebrating around a happy child - monkeys, birds, sloths, frogs"
        },
        {
          pageNumber: 14,
          text: "'Obrigado, [CHILD_NAME]!' gritaram todos os amigos. 'Você sempre será bem-vindo(a) na nossa floresta!'",
          imagePrompt: "All the forest friends waving goodbye to the child hero"
        },
        {
          pageNumber: 15,
          text: "De volta em casa, [CHILD_NAME] sorriu lembrando da aventura. Agora sabia que proteger a natureza é o trabalho mais importante do mundo!",
          imagePrompt: "A child back home, looking out the window with a smile, remembering the forest adventure"
        }
      ],
      ageMin: 4,
      ageMax: 8,
      culture: "brazilian",
      active: true,
      createdAt: new Date(),
    };

    this.stories.set(defaultStory.id, defaultStory);
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }

  async getActiveStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.active);
  }

  async getStoryById(id: string): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = randomUUID();
    const story: Story = {
      ...insertStory,
      id,
      active: insertStory.active ?? true,
      createdAt: new Date(),
    };
    this.stories.set(id, story);
    return story;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      status: insertOrder.status ?? "pending",
      stripePaymentIntentId: insertOrder.stripePaymentIntentId ?? null,
      shippingAddress: insertOrder.shippingAddress ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      const updatedOrder = { ...order, status, updatedAt: new Date() };
      this.orders.set(id, updatedOrder);
      return updatedOrder;
    }
    return undefined;
  }

  async updateOrderPaymentIntent(id: string, paymentIntentId: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      const updatedOrder = { ...order, stripePaymentIntentId: paymentIntentId, updatedAt: new Date() };
      this.orders.set(id, updatedOrder);
      return updatedOrder;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
