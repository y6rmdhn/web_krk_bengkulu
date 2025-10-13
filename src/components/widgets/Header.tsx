import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { IoMdDocument } from "react-icons/io";
import { MdOutlineChat, MdHistory } from "react-icons/md";

interface PropsType {
  title?: string;
  children?: boolean;
}

const Header = (props: PropsType) => {
  const { title = " Sistem Informasi KRK Online Kota Bengkulu", children } =
    props;

  const navigate = useNavigate();

  return (
    <div className="bg-[#3E6DCC] shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between">
          <p className="text-xl mt-1 text-white">{title}</p>
          {children ? (
            <div className="flex gap-5">
              <Button className="bg-[#009845]">
                <MdHistory /> Riwayat Permohonan
              </Button>
              <Button className="bg-[#009845]">
                <MdOutlineChat /> Inbox
              </Button>
              <Button
                onClick={() => navigate("/berkas")}
                className="bg-[#009845]"
              >
                <IoMdDocument /> Berkas
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
