import {
  ThemeProvider_default,
  _extends,
  _objectWithoutPropertiesLoose,
  colorChannel,
  createBreakpoints,
  createCssVarsProvider,
  createGetCssVar,
  createSpacing,
  createStyled,
  deepmerge,
  defaultSxConfig_default,
  generateUtilityClass,
  generateUtilityClasses,
  init_esm,
  init_esm2,
  init_extends,
  init_objectWithoutPropertiesLoose,
  styleFunctionSx_default,
  useThemeProps,
  useTheme_default
} from "./chunk-QOHDQVUI.js";
import {
  require_jsx_runtime
} from "./chunk-G3MLEX4F.js";
import {
  __toESM,
  require_react
} from "./chunk-HCO7BGZI.js";

// node_modules/@mui/joy/styles/CssVarsProvider.js
init_esm();
init_esm2();

// node_modules/@mui/joy/styles/extendTheme.js
init_extends();
init_objectWithoutPropertiesLoose();
init_esm();
init_esm2();

// node_modules/@mui/joy/styles/sxConfig.js
init_extends();
init_esm2();
var sxConfig = _extends({}, defaultSxConfig_default, {
  borderRadius: {
    themeKey: "radius"
  },
  boxShadow: {
    themeKey: "shadow"
  },
  fontFamily: {
    themeKey: "fontFamily"
  },
  fontSize: {
    themeKey: "fontSize"
  },
  fontWeight: {
    themeKey: "fontWeight"
  },
  letterSpacing: {
    themeKey: "letterSpacing"
  },
  lineHeight: {
    themeKey: "lineHeight"
  }
});
var sxConfig_default = sxConfig;

// node_modules/@mui/joy/colors/colors.js
var colors = {
  grey: {
    50: "#F7F7F8",
    100: "#EBEBEF",
    200: "#D8D8DF",
    300: "#B9B9C6",
    400: "#8F8FA3",
    500: "#73738C",
    600: "#5A5A72",
    700: "#434356",
    800: "#25252D",
    900: "#131318"
  },
  blue: {
    50: "#F4FAFF",
    100: "#DDF1FF",
    200: "#ADDBFF",
    300: "#6FB6FF",
    400: "#3990FF",
    500: "#096BDE",
    600: "#054DA7",
    700: "#02367D",
    800: "#072859",
    900: "#00153C"
  },
  yellow: {
    50: "#FFF8C5",
    100: "#FAE17D",
    200: "#EAC54F",
    300: "#D4A72C",
    400: "#BF8700",
    500: "#9A6700",
    600: "#7D4E00",
    700: "#633C01",
    800: "#4D2D00",
    900: "#3B2300"
  },
  red: {
    50: "#FFF8F6",
    100: "#FFE9E8",
    200: "#FFC7C5",
    300: "#FF9192",
    400: "#FA5255",
    500: "#D3232F",
    600: "#A10E25",
    700: "#77061B",
    800: "#580013",
    900: "#39000D"
  },
  green: {
    50: "#F3FEF5",
    100: "#D7F5DD",
    200: "#77EC95",
    300: "#4CC76E",
    400: "#2CA24D",
    500: "#1A7D36",
    600: "#0F5D26",
    700: "#034318",
    800: "#002F0F",
    900: "#001D09"
  },
  purple: {
    50: "#FDF7FF",
    100: "#F4EAFF",
    200: "#E1CBFF",
    300: "#C69EFF",
    400: "#A374F9",
    500: "#814DDE",
    600: "#5F35AE",
    700: "#452382",
    800: "#301761",
    900: "#1D0A42"
  }
};
var colors_default = colors;

// node_modules/@mui/joy/className/index.js
init_esm();
init_esm();
var generateUtilityClass2 = (componentName, slot) => generateUtilityClass(componentName, slot, "Joy");
var generateUtilityClasses2 = (componentName, slots) => generateUtilityClasses(componentName, slots, "Joy");

// node_modules/@mui/joy/styles/variantUtils.js
init_extends();
init_esm2();
var isVariantPalette = (colorPalette) => colorPalette && typeof colorPalette === "object" && Object.keys(colorPalette).some((value) => {
  var _value$match;
  return (_value$match = value.match) == null ? void 0 : _value$match.call(value, /^(plain(Hover|Active|Disabled)?(Color|Bg)|outlined(Hover|Active|Disabled)?(Color|Border|Bg)|soft(Hover|Active|Disabled)?(Color|Bg)|solid(Hover|Active|Disabled)?(Color|Bg))$/);
});
var assignCss = (target, variantVar, value) => {
  if (variantVar.includes("Color")) {
    target.color = value;
  }
  if (variantVar.includes("Bg")) {
    target.backgroundColor = value;
  }
  if (variantVar.includes("Border")) {
    target.borderColor = value;
  }
};
var createVariantStyle = (name, palette, getCssVar) => {
  const result = {};
  Object.entries(palette || {}).forEach(([variantVar, value]) => {
    if (variantVar.match(new RegExp(`${name}(color|bg|border)`, "i")) && !!value) {
      const cssVar = getCssVar ? getCssVar(variantVar) : value;
      if (variantVar.includes("Hover")) {
        result.cursor = "pointer";
      }
      if (variantVar.includes("Disabled")) {
        result.pointerEvents = "none";
        result.cursor = "default";
      }
      if (variantVar.match(/(Hover|Active|Disabled)/)) {
        assignCss(result, variantVar, cssVar);
      } else {
        if (!result["--variant-borderWidth"]) {
          result["--variant-borderWidth"] = "0px";
        }
        if (variantVar.includes("Border")) {
          result["--variant-borderWidth"] = "1px";
          result.border = "var(--variant-borderWidth) solid";
        }
        assignCss(result, variantVar, cssVar);
      }
    }
  });
  return result;
};
var createPrefixVar = (cssVarPrefix) => {
  return (cssVar) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}${cssVar.replace(/^--/, "")}`;
};
var createVariant = (variant, theme) => {
  let result = {};
  if (theme) {
    const {
      getCssVar,
      palette
    } = theme;
    Object.entries(palette).forEach((entry) => {
      const [color, colorPalette] = entry;
      if (isVariantPalette(colorPalette) && typeof colorPalette === "object") {
        result = _extends({}, result, {
          [color]: createVariantStyle(variant, colorPalette, (variantVar) => getCssVar(`palette-${color}-${variantVar}`))
        });
      }
    });
  }
  result.context = createVariantStyle(variant, {
    plainColor: "var(--variant-plainColor)",
    plainHoverColor: `var(--variant-plainHoverColor)`,
    plainHoverBg: "var(--variant-plainHoverBg)",
    plainActiveBg: "var(--variant-plainActiveBg)",
    plainDisabledColor: "var(--variant-plainDisabledColor)",
    outlinedColor: "var(--variant-outlinedColor)",
    outlinedBorder: "var(--variant-outlinedBorder)",
    outlinedHoverColor: `var(--variant-outlinedHoverColor)`,
    outlinedHoverBorder: `var(--variant-outlinedHoverBorder)`,
    outlinedHoverBg: `var(--variant-outlinedHoverBg)`,
    outlinedActiveBg: `var(--variant-outlinedActiveBg)`,
    outlinedDisabledColor: `var(--variant-outlinedDisabledColor)`,
    outlinedDisabledBorder: `var(--variant-outlinedDisabledBorder)`,
    softColor: "var(--variant-softColor)",
    softBg: "var(--variant-softBg)",
    softHoverColor: "var(--variant-softHoverColor)",
    softHoverBg: "var(--variant-softHoverBg)",
    softActiveBg: "var(--variant-softActiveBg)",
    softDisabledColor: "var(--variant-softDisabledColor)",
    softDisabledBg: "var(--variant-softDisabledBg)",
    solidColor: "var(--variant-solidColor)",
    solidBg: "var(--variant-solidBg)",
    solidHoverColor: "var(--variant-solidHoverColor)",
    solidHoverBg: "var(--variant-solidHoverBg)",
    solidActiveBg: "var(--variant-solidActiveBg)",
    solidDisabledColor: "var(--variant-solidDisabledColor)",
    solidDisabledBg: "var(--variant-solidDisabledBg)"
  });
  return result;
};
var createSoftInversion = (theme) => {
  const getCssVar = createGetCssVar(theme.cssVarPrefix);
  const cssVarPrefixVar = createPrefixVar(theme.cssVarPrefix);
  const result = {};
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry;
    if (isVariantPalette(colorPalette)) {
      result[color] = {
        "--Badge-ringColor": getCssVar(`palette-${color}-softBg`),
        [theme.getColorSchemeSelector("light")]: {
          [cssVarPrefixVar("--palette-focusVisible")]: getCssVar(`palette-${color}-500`),
          [cssVarPrefixVar("--palette-background-body")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.1)`,
          [cssVarPrefixVar("--palette-background-surface")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,
          [cssVarPrefixVar("--palette-background-level1")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
          [cssVarPrefixVar("--palette-background-level2")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          [cssVarPrefixVar("--palette-background-level3")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.48)`,
          [cssVarPrefixVar("--palette-text-primary")]: getCssVar(`palette-${color}-700`),
          [cssVarPrefixVar("--palette-text-secondary")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.8)`,
          [cssVarPrefixVar("--palette-text-tertiary")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.68)`,
          [cssVarPrefixVar("--palette-divider")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          "--variant-plainColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 1)`,
          "--variant-plainHoverColor": getCssVar(`palette-${color}-600`),
          "--variant-plainHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          "--variant-plainActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          "--variant-plainDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          "--variant-outlinedColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 1)`,
          "--variant-outlinedBorder": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
          "--variant-outlinedHoverColor": getCssVar(`palette-${color}-600`),
          "--variant-outlinedHoverBorder": getCssVar(`palette-${color}-300`),
          "--variant-outlinedHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          "--variant-outlinedActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          "--variant-outlinedDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          "--variant-outlinedDisabledBorder": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          "--variant-softColor": getCssVar(`palette-${color}-600`),
          "--variant-softBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.72)`,
          "--variant-softHoverColor": getCssVar(`palette-${color}-700`),
          "--variant-softHoverBg": getCssVar(`palette-${color}-200`),
          "--variant-softActiveBg": getCssVar(`palette-${color}-300`),
          "--variant-softDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          "--variant-softDisabledBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,
          "--variant-solidColor": getCssVar("palette-common-white"),
          "--variant-solidBg": getCssVar(`palette-${color}-600`),
          "--variant-solidHoverColor": getCssVar("palette-common-white"),
          "--variant-solidHoverBg": getCssVar(`palette-${color}-700`),
          "--variant-solidActiveBg": getCssVar(`palette-${color}-800`),
          "--variant-solidDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          "--variant-solidDisabledBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`
        },
        [theme.getColorSchemeSelector("dark")]: {
          [cssVarPrefixVar("--palette-focusVisible")]: getCssVar(`palette-${color}-300`),
          [cssVarPrefixVar("--palette-background-body")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.1)`,
          [cssVarPrefixVar("--palette-background-surface")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,
          [cssVarPrefixVar("--palette-background-level1")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
          [cssVarPrefixVar("--palette-background-level2")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
          [cssVarPrefixVar("--palette-background-level3")]: `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          [cssVarPrefixVar("--palette-text-primary")]: getCssVar(`palette-${color}-100`),
          [cssVarPrefixVar("--palette-text-secondary")]: `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.72)`,
          [cssVarPrefixVar("--palette-text-tertiary")]: `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.6)`,
          [cssVarPrefixVar("--palette-divider")]: `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.2)`,
          "--variant-plainColor": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 1)`,
          "--variant-plainHoverColor": getCssVar(`palette-${color}-50`),
          "--variant-plainHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
          "--variant-plainActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          "--variant-plainDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-outlinedColor": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 1)`,
          "--variant-outlinedHoverColor": getCssVar(`palette-${color}-50`),
          "--variant-outlinedBg": "initial",
          "--variant-outlinedBorder": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
          "--variant-outlinedHoverBorder": getCssVar(`palette-${color}-600`),
          "--variant-outlinedHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
          "--variant-outlinedActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          "--variant-outlinedDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-outlinedDisabledBorder": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
          "--variant-softColor": getCssVar(`palette-${color}-100`),
          "--variant-softBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          "--variant-softHoverColor": "#fff",
          "--variant-softHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          "--variant-softActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.48)`,
          "--variant-softDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-softDisabledBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          "--variant-solidColor": "#fff",
          "--variant-solidBg": getCssVar(`palette-${color}-500`),
          "--variant-solidHoverColor": "#fff",
          "--variant-solidHoverBg": getCssVar(`palette-${color}-500`),
          "--variant-solidActiveBg": getCssVar(`palette-${color}-600`),
          "--variant-solidDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-solidDisabledBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`
        }
      };
    }
  });
  return result;
};
var createSolidInversion = (theme) => {
  const getCssVar = createGetCssVar(theme.cssVarPrefix);
  const cssVarPrefixVar = createPrefixVar(theme.cssVarPrefix);
  const result = {};
  Object.entries(theme.palette).forEach((entry) => {
    const [color, colorPalette] = entry;
    if (isVariantPalette(colorPalette)) {
      if (color === "warning") {
        result.warning = {
          "--Badge-ringColor": getCssVar(`palette-${color}-solidBg`),
          [cssVarPrefixVar("--palette-focusVisible")]: getCssVar(`palette-${color}-700`),
          [cssVarPrefixVar("--palette-background-body")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.16)`,
          [cssVarPrefixVar("--palette-background-surface")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.1)`,
          [cssVarPrefixVar("--palette-background-popup")]: getCssVar(`palette-${color}-100`),
          [cssVarPrefixVar("--palette-background-level1")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.2)`,
          [cssVarPrefixVar("--palette-background-level2")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.36)`,
          [cssVarPrefixVar("--palette-background-level3")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.6)`,
          [cssVarPrefixVar("--palette-text-primary")]: getCssVar(`palette-${color}-900`),
          [cssVarPrefixVar("--palette-text-secondary")]: getCssVar(`palette-${color}-700`),
          [cssVarPrefixVar("--palette-text-tertiary")]: getCssVar(`palette-${color}-500`),
          [cssVarPrefixVar("--palette-divider")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.2)`,
          "--variant-plainColor": getCssVar(`palette-${color}-700`),
          "--variant-plainHoverColor": getCssVar(`palette-${color}-800`),
          "--variant-plainHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          "--variant-plainActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          "--variant-plainDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-outlinedColor": getCssVar(`palette-${color}-700`),
          "--variant-outlinedBorder": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.5)`,
          "--variant-outlinedHoverColor": getCssVar(`palette-${color}-800`),
          "--variant-outlinedHoverBorder": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          "--variant-outlinedHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          "--variant-outlinedActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          "--variant-outlinedDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-outlinedDisabledBorder": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
          "--variant-softColor": getCssVar(`palette-${color}-800`),
          "--variant-softHoverColor": getCssVar(`palette-${color}-900`),
          "--variant-softBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.2)`,
          "--variant-softHoverBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.28)`,
          "--variant-softActiveBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          "--variant-softDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-softDisabledBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,
          "--variant-solidColor": "#fff",
          "--variant-solidBg": getCssVar(`palette-${color}-700`),
          "--variant-solidHoverColor": "#fff",
          "--variant-solidHoverBg": getCssVar(`palette-${color}-800`),
          "--variant-solidActiveBg": getCssVar(`palette-${color}-600`),
          "--variant-solidDisabledColor": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.72)`,
          "--variant-solidDisabledBg": `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`
        };
      } else {
        result[color] = {
          "--Badge-ringColor": getCssVar(`palette-${color}-solidBg`),
          [cssVarPrefixVar("--palette-focusVisible")]: getCssVar(`palette-${color}-200`),
          [cssVarPrefixVar("--palette-background-body")]: "rgba(0 0 0 / 0.1)",
          [cssVarPrefixVar("--palette-background-surface")]: "rgba(0 0 0 / 0.06)",
          [cssVarPrefixVar("--palette-background-popup")]: getCssVar(`palette-${color}-700`),
          [cssVarPrefixVar("--palette-background-level1")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.2)`,
          [cssVarPrefixVar("--palette-background-level2")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.36)`,
          [cssVarPrefixVar("--palette-background-level3")]: `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.6)`,
          [cssVarPrefixVar("--palette-text-primary")]: getCssVar(`palette-common-white`),
          [cssVarPrefixVar("--palette-text-secondary")]: getCssVar(`palette-${color}-100`),
          [cssVarPrefixVar("--palette-text-tertiary")]: getCssVar(`palette-${color}-200`),
          [cssVarPrefixVar("--palette-divider")]: `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.32)`,
          "--variant-plainColor": getCssVar(`palette-${color}-50`),
          "--variant-plainHoverColor": `#fff`,
          "--variant-plainHoverBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          "--variant-plainActiveBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.32)`,
          "--variant-plainDisabledColor": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.72)`,
          "--variant-outlinedColor": getCssVar(`palette-${color}-50`),
          "--variant-outlinedBorder": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.5)`,
          "--variant-outlinedHoverColor": `#fff`,
          "--variant-outlinedHoverBorder": getCssVar(`palette-${color}-300`),
          "--variant-outlinedHoverBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          "--variant-outlinedActiveBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.32)`,
          "--variant-outlinedDisabledColor": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.72)`,
          "--variant-outlinedDisabledBorder": `rgba(255 255 255 / 0.2)`,
          "--variant-softColor": getCssVar(`palette-common-white`),
          "--variant-softHoverColor": getCssVar(`palette-common-white`),
          "--variant-softBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.24)`,
          "--variant-softHoverBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.36)`,
          "--variant-softActiveBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.16)`,
          "--variant-softDisabledColor": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.72)`,
          "--variant-softDisabledBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.1)`,
          "--variant-solidColor": getCssVar(`palette-${color}-700`),
          "--variant-solidBg": getCssVar(`palette-common-white`),
          "--variant-solidHoverColor": getCssVar(`palette-${color}-900`),
          "--variant-solidHoverBg": getCssVar(`palette-${color}-100`),
          "--variant-solidActiveBg": getCssVar(`palette-${color}-200`),
          "--variant-solidDisabledColor": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.72)`,
          "--variant-solidDisabledBg": `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.1)`
        };
      }
    }
  });
  return result;
};

// node_modules/@mui/joy/styles/extendTheme.js
var _excluded = ["cssVarPrefix", "breakpoints", "spacing", "components", "variants"];
var _excluded2 = ["colorSchemes"];
var createGetCssVar2 = (cssVarPrefix = "joy") => createGetCssVar(cssVarPrefix);
function extendTheme(themeOptions) {
  const _ref = themeOptions || {}, {
    cssVarPrefix = "joy",
    breakpoints,
    spacing,
    components: componentsInput,
    variants: variantsInput
  } = _ref, scalesInput = _objectWithoutPropertiesLoose(_ref, _excluded);
  const getCssVar = createGetCssVar2(cssVarPrefix);
  const createLightModeVariantVariables = (color) => ({
    plainColor: getCssVar(`palette-${color}-600`),
    plainHoverBg: getCssVar(`palette-${color}-100`),
    plainActiveBg: getCssVar(`palette-${color}-200`),
    plainDisabledColor: getCssVar(`palette-${color}-200`),
    outlinedColor: getCssVar(`palette-${color}-500`),
    outlinedBorder: getCssVar(`palette-${color}-200`),
    outlinedHoverBg: getCssVar(`palette-${color}-100`),
    outlinedHoverBorder: getCssVar(`palette-${color}-300`),
    outlinedActiveBg: getCssVar(`palette-${color}-200`),
    outlinedDisabledColor: getCssVar(`palette-${color}-100`),
    outlinedDisabledBorder: getCssVar(`palette-${color}-100`),
    softColor: getCssVar(`palette-${color}-600`),
    softBg: getCssVar(`palette-${color}-100`),
    softHoverBg: getCssVar(`palette-${color}-200`),
    softActiveBg: getCssVar(`palette-${color}-300`),
    softDisabledColor: getCssVar(`palette-${color}-300`),
    softDisabledBg: getCssVar(`palette-${color}-50`),
    solidColor: "#fff",
    solidBg: getCssVar(`palette-${color}-500`),
    solidHoverBg: getCssVar(`palette-${color}-600`),
    solidActiveBg: getCssVar(`palette-${color}-700`),
    solidDisabledColor: `#fff`,
    solidDisabledBg: getCssVar(`palette-${color}-200`)
  });
  const createDarkModeVariantVariables = (color) => ({
    plainColor: getCssVar(`palette-${color}-300`),
    plainHoverBg: getCssVar(`palette-${color}-800`),
    plainActiveBg: getCssVar(`palette-${color}-700`),
    plainDisabledColor: getCssVar(`palette-${color}-800`),
    outlinedColor: getCssVar(`palette-${color}-200`),
    outlinedBorder: getCssVar(`palette-${color}-700`),
    outlinedHoverBg: getCssVar(`palette-${color}-800`),
    outlinedHoverBorder: getCssVar(`palette-${color}-600`),
    outlinedActiveBg: getCssVar(`palette-${color}-900`),
    outlinedDisabledColor: getCssVar(`palette-${color}-800`),
    outlinedDisabledBorder: getCssVar(`palette-${color}-800`),
    softColor: getCssVar(`palette-${color}-200`),
    softBg: getCssVar(`palette-${color}-900`),
    softHoverBg: getCssVar(`palette-${color}-800`),
    softActiveBg: getCssVar(`palette-${color}-700`),
    softDisabledColor: getCssVar(`palette-${color}-800`),
    softDisabledBg: getCssVar(`palette-${color}-900`),
    solidColor: `#fff`,
    solidBg: getCssVar(`palette-${color}-600`),
    solidHoverBg: getCssVar(`palette-${color}-700`),
    solidActiveBg: getCssVar(`palette-${color}-800`),
    solidDisabledColor: getCssVar(`palette-${color}-700`),
    solidDisabledBg: getCssVar(`palette-${color}-900`)
  });
  const lightColorSystem = {
    palette: {
      mode: "light",
      primary: _extends({}, colors_default.blue, createLightModeVariantVariables("primary")),
      neutral: _extends({}, colors_default.grey, {
        plainColor: getCssVar(`palette-neutral-800`),
        plainHoverColor: getCssVar(`palette-neutral-900`),
        plainHoverBg: getCssVar(`palette-neutral-100`),
        plainActiveBg: getCssVar(`palette-neutral-200`),
        plainDisabledColor: getCssVar(`palette-neutral-300`),
        outlinedColor: getCssVar(`palette-neutral-800`),
        outlinedBorder: getCssVar(`palette-neutral-200`),
        outlinedHoverColor: getCssVar(`palette-neutral-900`),
        outlinedHoverBg: getCssVar(`palette-neutral-100`),
        outlinedHoverBorder: getCssVar(`palette-neutral-300`),
        outlinedActiveBg: getCssVar(`palette-neutral-200`),
        outlinedDisabledColor: getCssVar(`palette-neutral-300`),
        outlinedDisabledBorder: getCssVar(`palette-neutral-100`),
        softColor: getCssVar(`palette-neutral-800`),
        softBg: getCssVar(`palette-neutral-100`),
        softHoverColor: getCssVar(`palette-neutral-900`),
        softHoverBg: getCssVar(`palette-neutral-200`),
        softActiveBg: getCssVar(`palette-neutral-300`),
        softDisabledColor: getCssVar(`palette-neutral-300`),
        softDisabledBg: getCssVar(`palette-neutral-50`),
        solidColor: getCssVar(`palette-common-white`),
        solidBg: getCssVar(`palette-neutral-600`),
        solidHoverBg: getCssVar(`palette-neutral-700`),
        solidActiveBg: getCssVar(`palette-neutral-800`),
        solidDisabledColor: getCssVar(`palette-neutral-300`),
        solidDisabledBg: getCssVar(`palette-neutral-50`)
      }),
      danger: _extends({}, colors_default.red, createLightModeVariantVariables("danger")),
      info: _extends({}, colors_default.purple, createLightModeVariantVariables("info")),
      success: _extends({}, colors_default.green, createLightModeVariantVariables("success")),
      warning: _extends({}, colors_default.yellow, createLightModeVariantVariables("warning"), {
        solidColor: getCssVar(`palette-warning-800`),
        solidBg: getCssVar(`palette-warning-200`),
        solidHoverBg: getCssVar(`palette-warning-300`),
        solidActiveBg: getCssVar(`palette-warning-400`),
        solidDisabledColor: getCssVar(`palette-warning-200`),
        solidDisabledBg: getCssVar(`palette-warning-50`),
        softColor: getCssVar(`palette-warning-800`),
        softBg: getCssVar(`palette-warning-50`),
        softHoverBg: getCssVar(`palette-warning-100`),
        softActiveBg: getCssVar(`palette-warning-200`),
        softDisabledColor: getCssVar(`palette-warning-200`),
        softDisabledBg: getCssVar(`palette-warning-50`),
        outlinedColor: getCssVar(`palette-warning-800`),
        outlinedHoverBg: getCssVar(`palette-warning-50`),
        plainColor: getCssVar(`palette-warning-800`),
        plainHoverBg: getCssVar(`palette-warning-50`)
      }),
      common: {
        white: "#FFF",
        black: "#09090D"
      },
      text: {
        primary: getCssVar("palette-neutral-800"),
        secondary: getCssVar("palette-neutral-600"),
        tertiary: getCssVar("palette-neutral-500")
      },
      background: {
        body: getCssVar("palette-common-white"),
        surface: getCssVar("palette-common-white"),
        popup: getCssVar("palette-common-white"),
        level1: getCssVar("palette-neutral-50"),
        level2: getCssVar("palette-neutral-100"),
        level3: getCssVar("palette-neutral-200"),
        tooltip: getCssVar("palette-neutral-800"),
        backdrop: "rgba(255 255 255 / 0.5)"
      },
      divider: `rgba(${getCssVar("palette-neutral-mainChannel")} / 0.28)`,
      focusVisible: getCssVar("palette-primary-500")
    },
    shadowRing: "0 0 #000",
    shadowChannel: "187 187 187"
  };
  const darkColorSystem = {
    palette: {
      mode: "dark",
      primary: _extends({}, colors_default.blue, createDarkModeVariantVariables("primary")),
      neutral: _extends({}, colors_default.grey, {
        plainColor: getCssVar(`palette-neutral-200`),
        plainHoverColor: getCssVar(`palette-neutral-50`),
        plainHoverBg: getCssVar(`palette-neutral-800`),
        plainActiveBg: getCssVar(`palette-neutral-700`),
        plainDisabledColor: getCssVar(`palette-neutral-700`),
        outlinedColor: getCssVar(`palette-neutral-200`),
        outlinedBorder: getCssVar(`palette-neutral-800`),
        outlinedHoverColor: getCssVar(`palette-neutral-50`),
        outlinedHoverBg: getCssVar(`palette-neutral-800`),
        outlinedHoverBorder: getCssVar(`palette-neutral-700`),
        outlinedActiveBg: getCssVar(`palette-neutral-800`),
        outlinedDisabledColor: getCssVar(`palette-neutral-800`),
        outlinedDisabledBorder: getCssVar(`palette-neutral-800`),
        softColor: getCssVar(`palette-neutral-200`),
        softBg: getCssVar(`palette-neutral-800`),
        softHoverColor: getCssVar(`palette-neutral-50`),
        softHoverBg: getCssVar(`palette-neutral-700`),
        softActiveBg: getCssVar(`palette-neutral-600`),
        softDisabledColor: getCssVar(`palette-neutral-700`),
        softDisabledBg: getCssVar(`palette-neutral-900`),
        solidColor: getCssVar(`palette-common-white`),
        solidBg: getCssVar(`palette-neutral-600`),
        solidHoverBg: getCssVar(`palette-neutral-700`),
        solidActiveBg: getCssVar(`palette-neutral-800`),
        solidDisabledColor: getCssVar(`palette-neutral-700`),
        solidDisabledBg: getCssVar(`palette-neutral-900`)
      }),
      danger: _extends({}, colors_default.red, createDarkModeVariantVariables("danger")),
      info: _extends({}, colors_default.purple, createDarkModeVariantVariables("info")),
      success: _extends({}, colors_default.green, createDarkModeVariantVariables("success"), {
        solidColor: "#fff",
        solidBg: getCssVar(`palette-success-600`),
        solidHoverBg: getCssVar(`palette-success-700`),
        solidActiveBg: getCssVar(`palette-success-800`)
      }),
      warning: _extends({}, colors_default.yellow, createDarkModeVariantVariables("warning"), {
        solidColor: getCssVar(`palette-common-black`),
        solidBg: getCssVar(`palette-warning-300`),
        solidHoverBg: getCssVar(`palette-warning-400`),
        solidActiveBg: getCssVar(`palette-warning-500`)
      }),
      common: {
        white: "#FFF",
        black: "#09090D"
      },
      text: {
        primary: getCssVar("palette-neutral-100"),
        secondary: getCssVar("palette-neutral-300"),
        tertiary: getCssVar("palette-neutral-400")
      },
      background: {
        body: getCssVar("palette-neutral-900"),
        surface: getCssVar("palette-common-black"),
        popup: getCssVar("palette-neutral-800"),
        level1: getCssVar("palette-neutral-800"),
        level2: getCssVar("palette-neutral-700"),
        level3: getCssVar("palette-neutral-600"),
        tooltip: getCssVar("palette-neutral-600"),
        backdrop: `rgba(${getCssVar("palette-neutral-darkChannel")} / 0.5)`
      },
      divider: `rgba(${getCssVar("palette-neutral-mainChannel")} / 0.24)`,
      focusVisible: getCssVar("palette-primary-500")
    },
    shadowRing: "0 0 #000",
    shadowChannel: "0 0 0"
  };
  const defaultScales = {
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem
    },
    fontSize: {
      xs3: "0.5rem",
      xs2: "0.625rem",
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xl2: "1.5rem",
      xl3: "1.875rem",
      xl4: "2.25rem",
      xl5: "3rem",
      xl6: "3.75rem",
      xl7: "4.5rem"
    },
    fontFamily: {
      body: `"Public Sans", ${getCssVar("fontFamily-fallback")}`,
      display: `"Public Sans", ${getCssVar("fontFamily-fallback")}`,
      code: "Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
      fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    fontWeight: {
      xs: 200,
      sm: 300,
      md: 500,
      lg: 600,
      xl: 700,
      xl2: 800,
      xl3: 900
    },
    focus: {
      thickness: "2px",
      selector: `&.${generateUtilityClass2("", "focusVisible")}, &:focus-visible`,
      default: {
        outlineOffset: `var(--focus-outline-offset, ${getCssVar("focus-thickness")})`,
        outline: `${getCssVar("focus-thickness")} solid ${getCssVar("palette-focusVisible")}`
      }
    },
    lineHeight: {
      sm: 1.25,
      md: 1.5,
      lg: 1.7
    },
    letterSpacing: {
      sm: "-0.01em",
      md: "0.083em",
      lg: "0.125em"
    },
    radius: {
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "20px"
    },
    shadow: {
      xs: `${getCssVar("shadowRing")}, 0 1px 2px 0 rgba(${getCssVar("shadowChannel")} / 0.12)`,
      sm: `${getCssVar("shadowRing")}, 0.3px 0.8px 1.1px rgba(${getCssVar("shadowChannel")} / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(${getCssVar("shadowChannel")} / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(${getCssVar("shadowChannel")} / 0.26)`,
      md: `${getCssVar("shadowRing")}, 0.3px 0.8px 1.1px rgba(${getCssVar("shadowChannel")} / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(${getCssVar("shadowChannel")} / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(${getCssVar("shadowChannel")} / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(${getCssVar("shadowChannel")} / 0.29)`,
      lg: `${getCssVar("shadowRing")}, 0.3px 0.8px 1.1px rgba(${getCssVar("shadowChannel")} / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(${getCssVar("shadowChannel")} / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(${getCssVar("shadowChannel")} / 0.16), 4.8px 12px 17px -0.5px rgba(${getCssVar("shadowChannel")} / 0.19), 7px 17.5px 24.7px -0.7px rgba(${getCssVar("shadowChannel")} / 0.21)`,
      xl: `${getCssVar("shadowRing")}, 0.3px 0.8px 1.1px rgba(${getCssVar("shadowChannel")} / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(${getCssVar("shadowChannel")} / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(${getCssVar("shadowChannel")} / 0.16), 4.8px 12px 17px -0.5px rgba(${getCssVar("shadowChannel")} / 0.19), 7px 17.5px 24.7px -0.7px rgba(${getCssVar("shadowChannel")} / 0.21), 10.2px 25.5px 36px -0.9px rgba(${getCssVar("shadowChannel")} / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(${getCssVar("shadowChannel")} / 0.27), 21px 52.3px 74px -1.2px rgba(${getCssVar("shadowChannel")} / 0.29)`
    },
    typography: {
      display1: {
        fontFamily: getCssVar("fontFamily-display"),
        fontWeight: getCssVar("fontWeight-xl"),
        fontSize: getCssVar("fontSize-xl7"),
        lineHeight: getCssVar("lineHeight-sm"),
        letterSpacing: getCssVar("letterSpacing-sm"),
        color: getCssVar("palette-text-primary")
      },
      display2: {
        fontFamily: getCssVar("fontFamily-display"),
        fontWeight: getCssVar("fontWeight-xl"),
        fontSize: getCssVar("fontSize-xl6"),
        lineHeight: getCssVar("lineHeight-sm"),
        letterSpacing: getCssVar("letterSpacing-sm"),
        color: getCssVar("palette-text-primary")
      },
      h1: {
        fontFamily: getCssVar("fontFamily-display"),
        fontWeight: getCssVar("fontWeight-lg"),
        fontSize: getCssVar("fontSize-xl5"),
        lineHeight: getCssVar("lineHeight-sm"),
        letterSpacing: getCssVar("letterSpacing-sm"),
        color: getCssVar("palette-text-primary")
      },
      h2: {
        fontFamily: getCssVar("fontFamily-display"),
        fontWeight: getCssVar("fontWeight-lg"),
        fontSize: getCssVar("fontSize-xl4"),
        lineHeight: getCssVar("lineHeight-sm"),
        letterSpacing: getCssVar("letterSpacing-sm"),
        color: getCssVar("palette-text-primary")
      },
      h3: {
        fontFamily: getCssVar("fontFamily-body"),
        fontWeight: getCssVar("fontWeight-md"),
        fontSize: getCssVar("fontSize-xl3"),
        lineHeight: getCssVar("lineHeight-sm"),
        color: getCssVar("palette-text-primary")
      },
      h4: {
        fontFamily: getCssVar("fontFamily-body"),
        fontWeight: getCssVar("fontWeight-md"),
        fontSize: getCssVar("fontSize-xl2"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-primary")
      },
      h5: {
        fontFamily: getCssVar("fontFamily-body"),
        fontWeight: getCssVar("fontWeight-md"),
        fontSize: getCssVar("fontSize-xl"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-primary")
      },
      h6: {
        fontFamily: getCssVar("fontFamily-body"),
        fontWeight: getCssVar("fontWeight-md"),
        fontSize: getCssVar("fontSize-lg"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-primary")
      },
      body1: {
        fontFamily: getCssVar("fontFamily-body"),
        fontSize: getCssVar("fontSize-md"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-primary")
      },
      body2: {
        fontFamily: getCssVar("fontFamily-body"),
        fontSize: getCssVar("fontSize-sm"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-secondary")
      },
      body3: {
        fontFamily: getCssVar("fontFamily-body"),
        fontSize: getCssVar("fontSize-xs"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-tertiary")
      },
      body4: {
        fontFamily: getCssVar("fontFamily-body"),
        fontSize: getCssVar("fontSize-xs2"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-tertiary")
      },
      body5: {
        fontFamily: getCssVar("fontFamily-body"),
        fontSize: getCssVar("fontSize-xs3"),
        lineHeight: getCssVar("lineHeight-md"),
        color: getCssVar("palette-text-tertiary")
      }
    }
  };
  const _ref2 = scalesInput ? deepmerge(defaultScales, scalesInput) : defaultScales, {
    colorSchemes
  } = _ref2, mergedScales = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  const {
    palette: firstColorSchemePalette
  } = Object.entries(colorSchemes)[0][1];
  const variantInput = {
    palette: firstColorSchemePalette,
    cssVarPrefix,
    getCssVar
  };
  const theme = _extends({
    colorSchemes
  }, mergedScales, {
    breakpoints: createBreakpoints(breakpoints != null ? breakpoints : {}),
    components: deepmerge({
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "xl"
        },
        styleOverrides: {
          root: ({
            ownerState,
            theme: themeProp
          }) => {
            var _theme$variants$plain, _theme$variants$plain2;
            const instanceFontSize = ownerState.instanceFontSize;
            return _extends({
              color: "var(--Icon-color)",
              margin: "var(--Icon-margin)"
            }, ownerState.fontSize && ownerState.fontSize !== "inherit" && {
              fontSize: `var(--Icon-fontSize, ${themeProp.fontSize[ownerState.fontSize]})`
            }, ownerState.color && ownerState.color !== "inherit" && ownerState.color !== "context" && themeProp.vars.palette[ownerState.color] && {
              color: themeProp.vars.palette[ownerState.color].plainColor
            }, ownerState.color === "context" && {
              color: (_theme$variants$plain = theme.variants.plain) == null ? void 0 : (_theme$variants$plain2 = _theme$variants$plain.context) == null ? void 0 : _theme$variants$plain2.color
            }, instanceFontSize && instanceFontSize !== "inherit" && {
              "--Icon-fontSize": themeProp.vars.fontSize[instanceFontSize]
            });
          }
        }
      }
    }, componentsInput),
    variants: deepmerge({
      plain: createVariant("plain", variantInput),
      plainHover: createVariant("plainHover", variantInput),
      plainActive: createVariant("plainActive", variantInput),
      plainDisabled: createVariant("plainDisabled", variantInput),
      outlined: createVariant("outlined", variantInput),
      outlinedHover: createVariant("outlinedHover", variantInput),
      outlinedActive: createVariant("outlinedActive", variantInput),
      outlinedDisabled: createVariant("outlinedDisabled", variantInput),
      soft: createVariant("soft", variantInput),
      softHover: createVariant("softHover", variantInput),
      softActive: createVariant("softActive", variantInput),
      softDisabled: createVariant("softDisabled", variantInput),
      solid: createVariant("solid", variantInput),
      solidHover: createVariant("solidHover", variantInput),
      solidActive: createVariant("solidActive", variantInput),
      solidDisabled: createVariant("solidDisabled", variantInput)
    }, variantsInput),
    cssVarPrefix,
    getCssVar,
    spacing: createSpacing(spacing),
    colorInversionConfig: {
      soft: ["plain", "outlined", "soft", "solid"],
      solid: ["plain", "outlined", "soft", "solid"]
    }
  });
  function attachColorChannels(palette) {
    Object.keys(palette).forEach((key) => {
      const channelMapping = {
        main: "500",
        light: "200",
        dark: "800"
      };
      if (!palette[key].mainChannel && palette[key][channelMapping.main]) {
        palette[key].mainChannel = colorChannel(palette[key][channelMapping.main]);
      }
      if (!palette[key].lightChannel && palette[key][channelMapping.light]) {
        palette[key].lightChannel = colorChannel(palette[key][channelMapping.light]);
      }
      if (!palette[key].darkChannel && palette[key][channelMapping.dark]) {
        palette[key].darkChannel = colorChannel(palette[key][channelMapping.dark]);
      }
    });
  }
  Object.entries(theme.colorSchemes).forEach(([, colorSystem]) => {
    attachColorChannels(colorSystem.palette);
  });
  theme.unstable_sxConfig = _extends({}, sxConfig_default, themeOptions == null ? void 0 : themeOptions.unstable_sxConfig);
  theme.unstable_sx = function sx2(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return theme;
}

// node_modules/@mui/joy/styles/CssVarsProvider.js
var shouldSkipGeneratingVar = (keys) => {
  var _keys$;
  return !!keys[0].match(/^(typography|variants|breakpoints|colorInversion|colorInversionConfig)$/) || keys[0] === "palette" && !!((_keys$ = keys[1]) != null && _keys$.match(/^(mode)$/)) || keys[0] === "focus" && keys[1] !== "thickness";
};
var {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript
} = createCssVarsProvider({
  theme: extendTheme(),
  attribute: "data-joy-color-scheme",
  modeStorageKey: "joy-mode",
  colorSchemeStorageKey: "joy-color-scheme",
  defaultColorScheme: {
    light: "light",
    dark: "dark"
  },
  resolveTheme: (mergedTheme) => {
    mergedTheme.colorInversion = deepmerge({
      soft: createSoftInversion(mergedTheme),
      solid: createSolidInversion(mergedTheme)
    }, mergedTheme.colorInversion, {
      clone: false
    });
    mergedTheme.unstable_sx = function sx2(props) {
      return styleFunctionSx_default({
        sx: props,
        theme: this
      });
    };
    return mergedTheme;
  },
  shouldSkipGeneratingVar
});

// node_modules/@mui/joy/styles/styled.js
init_esm2();

// node_modules/@mui/joy/styles/defaultTheme.js
init_extends();
init_objectWithoutPropertiesLoose();
init_esm();
init_esm2();
var _excluded3 = ["colorSchemes", "focus", "fontFamily", "fontSize", "fontWeight", "letterSpacing", "lineHeight", "radius", "shadow", "palette"];
var _excluded22 = ["mode", "colorScheme"];
var getThemeWithVars = (themeInput) => {
  const _extendTheme = extendTheme(themeInput), {
    colorSchemes,
    focus,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    radius,
    shadow,
    palette: paletteInput
  } = _extendTheme, restTheme = _objectWithoutPropertiesLoose(_extendTheme, _excluded3);
  const colorSchemePalette = deepmerge(colorSchemes[(paletteInput == null ? void 0 : paletteInput.colorScheme) || "light"].palette, paletteInput);
  const _ref = colorSchemePalette, {
    mode = "light",
    colorScheme = "light"
  } = _ref, palette = _objectWithoutPropertiesLoose(_ref, _excluded22);
  return _extends({
    focus,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    radius,
    shadow
  }, restTheme, {
    colorSchemes: _extends({}, colorSchemes, {
      [colorScheme]: palette
    }),
    palette: _extends({}, palette, {
      mode,
      colorScheme
    }),
    vars: {
      focus,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight,
      radius,
      shadow,
      palette
    },
    getColorSchemeSelector: () => "&"
  });
};
var defaultTheme = getThemeWithVars();
defaultTheme.variants = deepmerge({
  plain: createVariant("plain", defaultTheme),
  plainHover: createVariant("plainHover", defaultTheme),
  plainActive: createVariant("plainActive", defaultTheme),
  plainDisabled: createVariant("plainDisabled", defaultTheme),
  outlined: createVariant("outlined", defaultTheme),
  outlinedHover: createVariant("outlinedHover", defaultTheme),
  outlinedActive: createVariant("outlinedActive", defaultTheme),
  outlinedDisabled: createVariant("outlinedDisabled", defaultTheme),
  soft: createVariant("soft", defaultTheme),
  softHover: createVariant("softHover", defaultTheme),
  softActive: createVariant("softActive", defaultTheme),
  softDisabled: createVariant("softDisabled", defaultTheme),
  solid: createVariant("solid", defaultTheme),
  solidHover: createVariant("solidHover", defaultTheme),
  solidActive: createVariant("solidActive", defaultTheme),
  solidDisabled: createVariant("solidDisabled", defaultTheme)
}, defaultTheme.variants);
defaultTheme.colorInversion = deepmerge({
  soft: createSoftInversion(defaultTheme),
  solid: createSolidInversion(defaultTheme)
}, defaultTheme.colorInversion);
defaultTheme.unstable_sxConfig = sxConfig_default;
defaultTheme.unstable_sx = function sx(props) {
  return styleFunctionSx_default({
    sx: props,
    theme: this
  });
};
var defaultTheme_default = defaultTheme;

// node_modules/@mui/joy/styles/styled.js
var styled = createStyled({
  defaultTheme: defaultTheme_default
});
var styled_default = styled;

// node_modules/@mui/joy/styles/ThemeProvider.js
var React = __toESM(require_react());
init_esm2();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useTheme = () => {
  return useTheme_default(defaultTheme_default);
};
var getTheme = (themeInput) => {
  const theme = getThemeWithVars(themeInput);
  theme.unstable_sx = function sx2(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return theme;
};
function ThemeProvider({
  children,
  theme: themeInput
}) {
  return (0, import_jsx_runtime.jsx)(ThemeProvider_default, {
    theme: themeInput ? getTheme(themeInput) : defaultTheme_default,
    children
  });
}

// node_modules/@mui/joy/styles/useThemeProps.js
init_extends();
init_esm2();
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: _extends({}, defaultTheme_default, {
      components: {}
    })
  });
}

// node_modules/@mui/joy/styles/ColorInversion.js
var React2 = __toESM(require_react());
init_esm2();
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var VariantOverride = React2.createContext(void 0);
var useColorInversion = (childVariant) => {
  const overriableVariants = React2.useContext(VariantOverride);
  return {
    getColor: (instanceColorProp, defaultColorProp) => {
      if (overriableVariants && childVariant) {
        if (overriableVariants.includes(childVariant)) {
          return instanceColorProp || "context";
        }
      }
      return instanceColorProp || defaultColorProp;
    }
  };
};
function ColorInversionProvider({
  children,
  variant
}) {
  const theme = useTheme_default(defaultTheme_default);
  return (0, import_jsx_runtime2.jsx)(VariantOverride.Provider, {
    value: variant ? theme.colorInversionConfig[variant] : void 0,
    children
  });
}

// node_modules/@mui/joy/styles/StyledEngineProvider.js
init_esm2();

export {
  colors_default,
  generateUtilityClass2 as generateUtilityClass,
  generateUtilityClasses2 as generateUtilityClasses,
  createGetCssVar2 as createGetCssVar,
  extendTheme,
  shouldSkipGeneratingVar,
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript,
  defaultTheme_default,
  styled_default,
  useTheme,
  ThemeProvider,
  useThemeProps2 as useThemeProps,
  useColorInversion,
  ColorInversionProvider
};
//# sourceMappingURL=chunk-CODO5F7I.js.map
