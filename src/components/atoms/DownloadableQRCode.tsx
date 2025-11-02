import React, { useRef } from "react";
import QRCode from "react-qr-code";

interface DownloadableQRCodeProps {
  asset: {
    _id: string;
    assetNo: string;
  };
}

const DownloadableQRCode: React.FC<DownloadableQRCodeProps> = ({ asset }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const padding = 20;
      const textHeight = 30;
      const totalHeight = img.height + textHeight + padding;

      canvas.width = img.width + padding * 2;
      canvas.height = totalHeight + padding;

      // Draw background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR code centered
      const x = (canvas.width - img.width) / 2;
      ctx.drawImage(img, x, padding, img.width, img.height);

      // Draw text centered below
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        `Asset Name: ${asset.assetNo}`,
        canvas.width / 2,
        img.height + padding + textHeight / 1.5
      );

      URL.revokeObjectURL(url);

      // Download image
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${asset._id}.png`;
      downloadLink.click();
    };

    img.src = url;
  };

  return (
    <div className=" w-[256px]">
      <div ref={qrRef}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "256px" }}
          value={`https://asset-mgt.example.com/asset/${asset._id}`}
          viewBox="0 0 256 256"
        />
      </div>

      {/* This span shows on-screen, but text is also rendered in the image */}
      <span className="block mt-2 text-center">
        Asset Name: {asset.assetNo}
      </span>

      <button
        type="button"
        className="bg-gray-500 text-white text-sm my-2 px-3 py-1.5 rounded-sm cursor-pointer hover:bg-gray-700"
        onClick={downloadQRCode}
      >
        Download QR code
      </button>
    </div>
  );
};

export default DownloadableQRCode;
