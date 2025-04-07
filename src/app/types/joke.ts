type Joke = {
  type: string;
  setup: string;
  delivery: string;
};

type JokeNSWF = {
  type: string;
  setup: string;
  delivery: string;
  flags: {
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
    religious: boolean;
    political: boolean;
  };
};
