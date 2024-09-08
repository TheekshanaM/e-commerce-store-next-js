"use client";

import SearchIcon from "@mui/icons-material/Search";
import { alpha, InputBase, styled } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: "100%",
  // position: "absolute",
  // right: 0,
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (pathName === "/product-catalog") {
      // set params value to search box
      const params = new URLSearchParams(searchParams);
      setSearch(params.get("pn") || "");
    } else {
      // clear search box outside of product catalog page
      setSearch("");
    }
  }, [pathName, searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  // set params to find products
  const searchProduct = () => {
    const params = new URLSearchParams();
    if (search) {
      params.set("pn", search);
    } else {
      params.delete("pn");
      router.push(`/`);
      return;
    }
    router.push(`/product-catalog?${params.toString()}`);
  };
  return (
    <Search>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={handleChange}
        onKeyDown={(e) => (e.key === "Enter" ? searchProduct() : null)}
      />
      <SearchIconWrapper onClick={searchProduct}>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}
