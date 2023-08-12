"use client";
import Atropos from "atropos/react";
import Image from "next/image";
export default function Cryptonotify() {
  return (
    <Atropos className="my-atropos atropos-banner" shadowScale={1.05}>
      <Image
        src="/cryptonotify/bg.png"
        data-atropos-offset="0"
        alt="cryptonotify-bg"
        width={400}
        height={225}
      />
      <Image
        src="/cryptonotify/logo.png"
        data-atropos-offset="10"
        alt="cryptonotify-logo"
        width={400}
        height={225}
      />
      <Image
        src="/cryptonotify/text1.png"
        data-atropos-offset="10"
        alt="The Ultimate Cryptocurrency Alert Service"
        width={400}
        height={225}
      />
      <Image
        src="/cryptonotify/text2.png"
        data-atropos-offset="8"
        alt="Stay ahead of the market with custom alerts for any market-moving event"
        width={400}
        height={225}
      />
      <Image
        src="/touch.png"
        data-atropos-offset="30"
        data-atropos-opacity="0.8;-10"
        alt="touch"
        width={400}
        height={225}
        className="bounce"
      />
    </Atropos>
  );
}
