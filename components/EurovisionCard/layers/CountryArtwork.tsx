export function CountryArtwork({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="Country Background"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover object-center scale-[1.15] -translate-y-[20px]"
    />
  );
}
