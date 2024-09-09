type TProps = {
  cardData: {
    image: string;
    title: string;
    description: string;
    link: string;
  };
};

const FeatureCard = ({ cardData }: TProps) => {
  const { image, title, description, link } = cardData;
  return (
    <div className="w-full rounded overflow-hidden shadow-xl  group transition-transform duration-300">
      <div className=" mx-8 mt-8 overflow-hidden rounded-lg  ">
        <img
          className="w-full transition-transform duration-500 ease-in-out transform group-hover:scale-110  "
          src={image}
          alt={title}
        />
      </div>

      <div className="px-6 pt-6">
        <div className="font-bold text-xl mb-2 transition-colors duration-300 group-hover:text-red-500">
          {title}
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-2 pb-2">
        <a
          href={link}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition-all duration-300 ease-in-out group-hover:tracking-widest"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default FeatureCard;
