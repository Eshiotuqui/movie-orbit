import { tmdbImage, type ImageSize } from "@/utils/tmdb-image";

interface TmdbImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  path: string | null;
  size?: ImageSize;
  fallback?: string;
}

export function TmdbImage({
  path,
  size = "w500",
  fallback = "/placeholder.png",
  alt = "",
  ...props
}: TmdbImageProps) {
  return <img src={tmdbImage(path, size) ?? fallback} alt={alt} {...props} />;
}
