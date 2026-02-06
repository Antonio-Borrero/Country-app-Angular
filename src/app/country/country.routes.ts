import { Routes } from "@angular/router";
import { CountryLayout } from "./layouts/CountryLayout/CountryLayout";
import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { ByCountry } from "./pages/by-country-page/by-country-page";
import { ByRegion } from "./pages/by-region-page/by-region-page";
import { CountryPage } from "./pages/country-page/country-page";

export const countryRoutes: Routes = [
    {
        path: "",
        component: CountryLayout,
        children: [
            {
                path: "by-country",
                component: ByCountry,
            },
            {
                path: "by-capital",
                component: ByCapitalPage,
            },
            {
                path: "by-region",
                component: ByRegion,
            },
            {
                path: "by/:code",
                component: CountryPage,
            },
            {
                path: "**",
                redirectTo: "by-country",
            }
        ]
    },

];

export default countryRoutes