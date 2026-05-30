interface Stream {
  id: number;
  title: string;
  description: string;
  url: string;
  status: boolean;
  createdAt: string;
  recordedAt: string;
  updatedAt: string;
}

const initialStream: Stream = {
  id: -1,
  title: "",
  description: "",
  url: "",
  status: false,
  createdAt: "",
  recordedAt: "",
  updatedAt: "",
};

export { type Stream, initialStream };
