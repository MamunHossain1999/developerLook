const logos = [
  {
    name: "Google",
    url: "https://www.vectorlogo.zone/logos/google/google-ar21.svg",
  },
  {
    name: "ChatGPT",
    url: "https://www.vectorlogo.zone/logos/openai/openai-ar21.svg",
  },
  {
    name: "Gemini",
    url: "https://www.vectorlogo.zone/logos/google_gemini/google_gemini-ar21.svg",
  },
  {
    name: "TikTok",
    url: "https://www.vectorlogo.zone/logos/tiktok/tiktok-ar21.svg",
  },
  {
    name: "YouTube",
    url: "https://www.vectorlogo.zone/logos/youtube/youtube-ar21.svg",
  },
  {
    name: "Pinterest",
    url: "https://www.vectorlogo.zone/logos/pinterest/pinterest-ar21.svg",
  },
  {
    name: "GIPHY",
    url: "https://www.vectorlogo.zone/logos/giphy/giphy-logo.svg",
  },
  {
    name: "Reddit",
    url: "https://www.vectorlogo.zone/logos/reddit/reddit-ar21.svg",
  },
  {
    name: "Amazon",
    url: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg",
  },
];

const LogoMarquee = () => {
  return (
    <div className="w-full py-10 relative overflow-hidden">
      <div className="flex">
        {/* প্রথম সেট লোগো */}
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center">
            <img
              src={logo.url}
              alt={logo.name}
              className="h-4 md:h-8 mx-4 md:mx-6 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
