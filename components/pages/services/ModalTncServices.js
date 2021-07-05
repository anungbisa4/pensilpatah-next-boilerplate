import { useState } from "react";
import Modal from "@/components/Modal/Modal";

const ModalTncServices = ({ open, setOpen, setAgree }) => {
  const handleAgreement = (agree) => {
    if (agree) {
      setAgree(true);
      setOpen(!open);
      return false;
    }
    setAgree(false);
    setOpen(!open);
  };
  return (
    <Modal open={open} toggle={setOpen}>
      <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transform py-4">
        <div className="mx-6 p-6 px-8 shadow-xl rounded-2xl bg-white">
          <header className="relative pb-2">
            <h1 className="text-lg font-semibold text-center">
              Terms and Condition
            </h1>
            <span className="w-10 h-0.5 bg-blue-primary absolute bottom-0 left-1/2 transform -translate-x-1/2" />
          </header>
          <main className="text-xs font-medium my-4 mb-6 overflow-y-scroll scrollGradient">
            <p className="max-h-[327px] block">
              Ketentuan Penggunaan Aktivasi Xtream Box ("Ketentuan Penggunaan
              Situs") berikut adalah ketentuan dalam penggunaan aplikasi
              Transvision+ dan situs terkait lainnya (bersama-sama selanjutnya
              disebut "Situs") serta penggunaan konten, layanan dan fitur yang
              terdapat pada Aplikasi. Istilah "TRANSVISION" atau "Kami" merujuk
              kepada PT Indonusa Telemedia, sedangkan istilah "Anda" memiliki
              pengertian individu yang menggunakan/mengakses Situs ini.
              Diharapkan Anda membaca Ketentuan Aktivasi ini dengan
              sebaik-baiknya sebelum Anda mengakses dan menggunakannya. Dengan
              mengakses dan menggunakan Aktivasi ini, berarti Anda telah
              memahami dan menyetujui untuk terikat dengan seluruh syarat dan
              ketentuan yang terdapat dalam Aplikasi ini. Apabila Anda tidak
              menyetujui untuk terikat pada ketentuan yang terdapat dalam Situs
              ini, maka Kami sarankan dan Kami persilahkan agar Anda tidak
              menggunakan feature Aktivasi ini.
            </p>
          </main>
          <footer className="flex justify-end">
            <div className="w-32 flex items-center">
              <button
                className="button-outline-blue border-0 text-sm font-semibold"
                onClick={() => handleAgreement(false)}
              >
                Disagree
              </button>
            </div>
            <div className="w-32 flex items-center text-sm font-semibold">
              <button
                className="button-blue-gradient"
                onClick={() => handleAgreement(true)}
              >
                Agree
              </button>
            </div>
          </footer>
        </div>
        <button data-required />
      </div>
    </Modal>
  );
};

export default ModalTncServices;
