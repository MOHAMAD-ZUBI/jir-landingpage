import React from "react";
import FeatureCard from "../reusable/FeatureCard";

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gray-100/15 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="md:text-6xl text-3xl font-bold mb-4">
          <span className="text-black">Product </span>
          <span className="text-blue-400">features</span>
        </h2>

        <p className="text-gray-400 mb-16 max-w-4xl md:text-xl font-semibold tracking-wider mx-auto">
          Codemagic CI/CD integrates with Azure DevOps, GitHub, GitLab,
          Bitbucket, and other self-hosted or cloud-based Git repositories. You
          push the code – and Codemagic takes care of building, testing, and
          distributing your app.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🖥️" // You can replace with your actual icon component
            title="Build for all platforms"
            description="Use your preferred framework and target any platform with Codemagic – Android, iOS, web, or desktop."
          />

          <FeatureCard
            icon="⚙️" // You can replace with your actual icon component
            title="Automate with Codemagic"
            description="Automate the most time-consuming app release steps, such as code signing, building and uploading new app versions, and setting changelogs."
          />

          <FeatureCard
            icon="✓" // You can replace with your actual icon component
            title="Fully hosted and maintained"
            description="Get instant access to different hardware and software configurations with our cloud-based and fully maintained infrastructure."
          />
        </div>

        <div className="flex justify-center">
          <img
            src="https://codemagic.io/media/landing/homepage/ui-yaml-updated-dark2.png"
            alt="features"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
