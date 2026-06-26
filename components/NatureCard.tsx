import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  instagramUrl: string;
  phoneNumber: string;
  isAvailable: boolean;
};

type Props = {
  product: Product;
  imgHeight?: number; // px
  width?: number;     // px
};

export default function NatureCard({ product, imgHeight = 220, width = 210 }: Props) {
  return (
    <div
      className="product-card"
      style={{ width: `${width}px`, flexShrink: 0 }}
    >
      {/* Product image */}
      <div style={{ position: "relative", height: `${imgHeight}px`, width: "100%" }}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 260px"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl"
            style={{ background: "linear-gradient(135deg, #f0e8d0, #dbc898)" }}>
            🌸
          </div>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)" }}>
            <span style={{
              color: "var(--cream)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "rgba(0,0,0,0.6)",
              padding: "4px 12px",
              borderRadius: "20px"
            }}>Sold Out</span>
          </div>
        )}
      </div>

      {/* Info label — parchment bottom */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__divider">
          <span style={{ fontSize: "0.5rem" }}>◆</span>
        </div>
        <p className="product-card__price">€{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
