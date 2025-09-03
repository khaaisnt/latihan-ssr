import * as yup from "yup";

export const productSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  discountPercentage: yup
    .number()
    .min(0, "Discount must be positive")
    .max(100, "Discount must be less than 100%"),
  rating: yup
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .test(
      "is-decimal",
      "Rating must be a decimal between 0 and 5",
      (value) =>
        value === undefined ||
        (value >= 0 && value <= 5 && /^\d+(\.\d+)?$/.test(value.toString()))
    ),
  stock: yup
    .number()
    .required("Stock is required")
    .min(0, "Stock must be positive")
    .integer("Stock must be an integer"),
  brand: yup.string().max(50, "Brand must be less than 50 characters"),
  category: yup
    .string()
    .required("Category is required")
    .max(50, "Category must be less than 50 characters"),
});
