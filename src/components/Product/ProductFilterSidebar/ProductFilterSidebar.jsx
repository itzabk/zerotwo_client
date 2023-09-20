//START IMPORTS
import PropTypes from "prop-types";
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  TextField,
  Container,
} from "@mui/material";
import ProductList from "../ProductList/ProductList";
import Iconify from "../../Iconify/Iconify";
import Scrollbar from "../../Scrollbar/Scrollbar";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../../features/category/categoryApiSlice";
import { selectAllBrands } from "../../../features/brand/brandApiSlice";
import { useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "../../../features/product/productApiSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import BouncingPointsLoader from "../../BouncingLoader/BouncingLoader";
//STOP IMPORTS

export const SORT_BY_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({
  openFilter,
  onOpenFilter,
  onCloseFilter,
}) {
  const FILTER_CATEGORY_OPTIONS = useSelector(selectAllCategories);
  const FILTER_BRAND_OPTIONS = useSelector(selectAllBrands);
  const [query, setQuery] = useState({
    cat: "",
    brand: "",
    sort: "newest",
  });

  const [getProducts, { data: products, isLoading, isError, isSuccess }] =
    useLazyGetProductsQuery();
  const handleQuery = (e) => {
    let params;
    setQuery((prev) => {
      params = { ...prev, [e.target.name]: e.target.value };
      return params;
    });
    getProducts(params);
  };
  //initial rendereing
  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, []);
  //render UI
  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <TextField
            label="Sort"
            name="sort"
            value={query.sort}
            InputProps={{
              startAdornment: <FilterAltIcon />,
            }}
            onChange={handleQuery}
            select
          >
            {SORT_BY_OPTIONS.map((ele, i) => {
              return (
                <MenuItem name="sort" key={i} value={ele.value}>
                  {ele.label}
                </MenuItem>
              );
            })}
          </TextField>
          <Button
            disableRipple
            color="inherit"
            endIcon={<Iconify icon="ic:round-filter-list" />}
            onClick={onOpenFilter}
          >
            Filters&nbsp;
          </Button>
          <Drawer
            anchor="right"
            open={openFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: "none", overflow: "hidden" },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Stack>
            <Divider />
            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup
                    name="cat"
                    value={query.cat}
                    onChange={handleQuery}
                  >
                    {FILTER_CATEGORY_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item._id}
                        value={item._id}
                        control={<Radio />}
                        label={item.cname}
                      />
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Brands
                  </Typography>
                  <RadioGroup
                    name="brand"
                    value={query.brand}
                    onChange={handleQuery}
                  >
                    {FILTER_BRAND_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item._id}
                        value={item._id}
                        control={<Radio />}
                        label={item.bname}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </Stack>
            </Scrollbar>
            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                startIcon={<Iconify icon="ic:round-clear-all" />}
                onClick={(e) => {
                  setQuery((prev) => {
                    return { ...prev, cat: "", brand: "", sort: "newest" };
                  });
                  getProducts();
                }}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Stack>
      </Stack>

      {isLoading && <BouncingPointsLoader />}
      {isSuccess && products?.ids?.length > 0 ? (
        <Container>
          {" "}
          <ProductList products={products} />
       
        </Container>
      ) : (
        <div
          style={{
            backgroundImage: "url(/no-results.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: "inherit",
            height: "100vh",
          }}
        ></div>
      )}
      {isError && (
        <div
          style={{
            backgroundImage: "url(/no-results.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: "inherit",
            height: "100vh",
          }}
        ></div>
      )}
    </>
  );
}
