import { RestaurantType } from "./../../../../src/types/restaurant.type";
import antwerp from "./antwerp";
import chicago from "./chicago";
import toronto from "./toronto";
import sanFrancisco from "./san_francisco";

export const mocks: Record<string, any> = {
  "51.219448,4.402464": antwerp,
  "43.653225,-79.383186": toronto,
  "41.878113,-87.629799": chicago,
  "37.7749295,-122.4194155": sanFrancisco,
};

export const mockImages = [
  "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-pancakes-600x750.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/02/messy-pizza-on-a-black-table-600x400.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2019/02/pizza-ready-for-baking-600x400.jpg",
];

export const addMockImage = (restaurant: RestaurantType) => {
  const randomIndex = Math.ceil(Math.random() * (mockImages.length - 1));
  restaurant.formattedPhotos = [mockImages[randomIndex]];

  return restaurant;
};
