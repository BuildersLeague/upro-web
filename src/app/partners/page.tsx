"use client";

import PartnerSection from "@/components/partner/PartnerSection";

export default function ProfilePage() {
  const forParentTitle = "🏠 For Parents";
  const forParentDesc =
    "Turn screen time into skill time. U-Pro helps your child build\n" +
    "          confidence, discipline, and healthy habits — all while having fun at\n" +
    "          home.";
  const forParentImage = "/images/partner/for-parent.webp";

  const forCoachTitle = "⚽ For Coaches";
  const forCoachDesc =
    "Give every player more ball touches, targeted drills, and instant\n" +
    "          feedback — even between practices. U-Pro supports your coaching from\n" +
    "          anywhere.";
  const forCoachImage = "/images/partner/for-coach.webp";

  const forClubTitle = "📊 For Clubs";
  const forClubDesc =
    "Need scalable training that works off-field too? U-Pro helps clubs\n" +
    "          deliver consistent development, track player progress, and engage\n" +
    "          families year-round.";
  const forClubImage = "/images/partner/for-club.webp";

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8 gap-8 flex flex-col">
      <section className="mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          More Than Just an App
        </h1>
        <p className="text-2xl mb-8 text-center">
          A Training Partner You Can Trust
        </p>
      </section>

      <PartnerSection
        title={forParentTitle}
        desc={forParentDesc}
        imgSrc={forParentImage}
      ></PartnerSection>

      <PartnerSection
        title={forCoachTitle}
        desc={forCoachDesc}
        imgSrc={forCoachImage}
      ></PartnerSection>

      <PartnerSection
        title={forClubTitle}
        desc={forClubDesc}
        imgSrc={forClubImage}
      ></PartnerSection>
    </div>
  );
}
