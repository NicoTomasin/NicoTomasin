"use client";
import Atropos from "atropos/react";
import Image from "next/image";
export default function Cryptonotify() {
  return (
    <Atropos className="my-atropos atropos-banner" shadowScale={1.05}>
      <Image
        className="atroposImage"
        src="/projectsCardsImages/cryptonotify/bg.png"
        data-atropos-offset="0"
        alt="cryptonotify-bg"
        width={330}
        height={186}
      />
      <Image
        className="atroposImage"
        src="/projectsCardsImages/cryptonotify/logo.png"
        data-atropos-offset="10"
        alt="cryptonotify-logo"
        width={330}
        height={186}
      />
      <Image
        className="atroposImage"
        src="/projectsCardsImages/cryptonotify/text1.png"
        data-atropos-offset="10"
        alt="The Ultimate Cryptocurrency Alert Service"
        width={330}
        height={186}
      />
      <Image
        className="atroposImage"
        src="/projectsCardsImages/cryptonotify/text2.png"
        data-atropos-offset="8"
        alt="Stay ahead of the market with custom alerts for any market-moving event"
        width={330}
        height={186}
      />
      <Image
        className="atroposImage bounce"
        src="/projectsCardsImages/toque.png"
        data-atropos-offset="30"
        data-atropos-opacity="0.8;-10"
        alt="touch"
        width={330}
        height={186}
      />
    </Atropos>
  );
}
