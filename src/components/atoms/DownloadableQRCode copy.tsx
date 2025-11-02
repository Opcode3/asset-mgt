import React, { useRef } from "react";
import QRCode from "react-qr-code";
import Button from "./Button";
import type { AssetResponseType } from "../../types/asset";

interface DownloadableQRCodeProps {
  asset: AssetResponseType;
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
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${asset._id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = url;
  };

  return (
    <div>
      <div ref={qrRef} className=" w-[256px]">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "256px" }}
          value={`https://asset-mgt.example.com/asset/${asset._id}`}
          viewBox="0 0 256 256"
        />
        <span className="text-center w-full block">
          Asset Name: {asset.assetNo}
        </span>
      </div>
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
