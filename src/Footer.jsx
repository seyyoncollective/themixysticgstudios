import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

// Centralized Configuration Object
export const footerConfig = {
  brandName: "Mix G",
  navigationItems: [
    "Home",
    "Who We Are",
    "In the Studio",
    "Listen",
    "Trusted By",
    "Let's Talk"
  ],
  whatsappLink: "https://wa.me/919884440774",
  instagramLink: "https://www.instagram.com/themixysticgstudios/",
  emailLink: "mailto:themixysticgstudios@gmail.com",
  callLink: "tel:+919884440774",
  buttonText: "Book a Call",
  statusText: "All systems normal"
};

// Inline SVG Vector Assets for Pixel-Perfect Scalability
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.432 5.63 1.433h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// ============================================================================
// TRACED SIGNATURE PATHS — extracted from founder's handwritten signature
// ============================================================================
const signaturePaths = [
  "M 1005,460 L 979,467 L 979,469 L 1008,462 L 1008,460",
  "M 1057,446 L 1046,450 L 1025,455 L 1025,457 L 1060,448 L 1060,446",
  "M 1788,251 L 1773,260 L 1762,264 L 1739,276 L 1736,276 L 1720,284 L 1667,304 L 1631,314 L 1621,314 L 1618,316 L 1610,316 L 1594,320 L 1578,320 L 1576,322 L 1576,325 L 1607,327 L 1627,323 L 1644,315 L 1648,315 L 1678,305 L 1703,293 L 1706,293 L 1713,289 L 1735,281 L 1776,261 L 1790,253 L 1790,251",
  "M 1533,249 L 1528,252 L 1528,257 L 1530,258 L 1544,259 L 1547,257 L 1559,257 L 1559,252 L 1549,252 L 1539,249",
  "M 1827,229 L 1800,244 L 1799,247 L 1829,231 L 1829,229",
  "M 1648,198 L 1625,206 L 1614,214 L 1581,244 L 1575,243 L 1564,262 L 1564,266 L 1566,269 L 1573,268 L 1595,243 L 1597,239 L 1625,214 L 1639,209 L 1644,209 L 1646,207 L 1652,207 L 1656,211 L 1656,224 L 1653,235 L 1651,252 L 1647,258 L 1640,258 L 1627,264 L 1615,266 L 1606,270 L 1601,270 L 1599,272 L 1577,276 L 1574,278 L 1568,278 L 1564,280 L 1548,282 L 1545,284 L 1528,286 L 1504,292 L 1497,292 L 1496,289 L 1503,285 L 1517,269 L 1522,257 L 1521,246 L 1514,242 L 1480,242 L 1456,248 L 1454,250 L 1454,252 L 1457,255 L 1455,276 L 1451,284 L 1428,282 L 1423,280 L 1410,279 L 1406,277 L 1408,273 L 1467,234 L 1470,231 L 1469,227 L 1464,228 L 1428,254 L 1426,254 L 1409,266 L 1387,278 L 1375,275 L 1373,260 L 1368,260 L 1368,268 L 1363,276 L 1347,276 L 1346,273 L 1360,265 L 1363,262 L 1363,258 L 1358,258 L 1335,272 L 1331,272 L 1329,270 L 1325,258 L 1322,258 L 1320,260 L 1319,275 L 1298,276 L 1297,273 L 1304,265 L 1306,265 L 1308,269 L 1315,268 L 1314,259 L 1310,255 L 1307,255 L 1300,258 L 1293,266 L 1285,272 L 1273,278 L 1267,278 L 1265,276 L 1265,268 L 1261,268 L 1258,281 L 1249,282 L 1247,269 L 1243,262 L 1239,262 L 1223,278 L 1202,292 L 1181,296 L 1180,293 L 1183,290 L 1188,290 L 1190,286 L 1189,284 L 1175,284 L 1170,292 L 1170,302 L 1137,318 L 1135,318 L 1134,315 L 1139,303 L 1139,287 L 1136,280 L 1129,280 L 1111,294 L 1102,294 L 1092,300 L 1090,305 L 1090,309 L 1092,311 L 1100,311 L 1109,307 L 1120,299 L 1128,290 L 1131,290 L 1132,295 L 1130,299 L 1128,312 L 1125,318 L 1125,327 L 1123,328 L 1123,330 L 1138,327 L 1140,325 L 1147,323 L 1155,317 L 1177,305 L 1194,303 L 1218,291 L 1238,287 L 1240,289 L 1238,309 L 1232,333 L 1232,338 L 1226,356 L 1219,360 L 1215,360 L 1200,366 L 1188,364 L 1096,364 L 1089,366 L 1076,366 L 1076,360 L 1074,360 L 1063,368 L 1055,368 L 1051,370 L 1037,372 L 1035,374 L 1031,374 L 1028,376 L 1018,378 L 1016,380 L 1000,384 L 993,388 L 980,392 L 975,396 L 948,408 L 920,424 L 882,448 L 844,476 L 818,498 L 800,504 L 798,506 L 790,508 L 780,513 L 778,515 L 778,519 L 780,521 L 786,521 L 791,519 L 808,517 L 824,513 L 827,511 L 832,511 L 843,507 L 848,507 L 880,499 L 883,497 L 895,495 L 949,477 L 955,476 L 955,474 L 944,476 L 943,472 L 941,472 L 935,478 L 919,482 L 912,482 L 909,484 L 903,484 L 900,486 L 895,486 L 875,492 L 869,492 L 867,494 L 854,496 L 836,502 L 831,501 L 832,498 L 843,495 L 850,491 L 910,471 L 914,471 L 946,459 L 949,459 L 950,463 L 952,463 L 960,455 L 968,451 L 972,451 L 974,449 L 1004,439 L 1032,427 L 1068,415 L 1070,413 L 1079,411 L 1092,405 L 1101,403 L 1103,401 L 1184,373 L 1195,373 L 1210,377 L 1222,377 L 1227,375 L 1231,360 L 1233,358 L 1248,353 L 1274,347 L 1277,345 L 1303,339 L 1306,337 L 1311,337 L 1314,335 L 1319,335 L 1330,331 L 1354,325 L 1359,325 L 1363,323 L 1368,323 L 1380,319 L 1440,307 L 1447,307 L 1451,305 L 1458,305 L 1462,303 L 1466,304 L 1466,306 L 1460,312 L 1421,340 L 1418,340 L 1410,344 L 1406,344 L 1404,346 L 1400,346 L 1400,348 L 1403,349 L 1402,354 L 1407,355 L 1430,339 L 1439,335 L 1443,335 L 1447,327 L 1484,299 L 1490,299 L 1494,297 L 1512,295 L 1536,289 L 1543,289 L 1547,287 L 1575,283 L 1603,276 L 1606,277 L 1606,280 L 1609,280 L 1645,267 L 1649,267 L 1659,262 L 1658,257 L 1660,252 L 1661,235 L 1664,227 L 1663,208 L 1657,200 L 1650,198",
  "M 1221,194 L 1182,216 L 1158,232 L 1156,232 L 1024,322 L 1018,322 L 1017,304 L 1013,302 L 1011,304 L 1011,311 L 1008,324 L 1004,330 L 993,340 L 990,339 L 994,324 L 993,310 L 987,309 L 981,312 L 975,318 L 962,326 L 940,343 L 934,345 L 933,342 L 939,330 L 943,325 L 944,321 L 949,316 L 947,312 L 944,312 L 936,318 L 932,324 L 930,331 L 920,348 L 920,356 L 930,358 L 938,355 L 944,351 L 951,343 L 983,320 L 986,321 L 986,324 L 984,326 L 984,330 L 978,343 L 977,349 L 985,355 L 990,355 L 1042,315 L 1124,257 L 1190,215 L 1212,203 L 1223,199 L 1225,197 L 1224,194",
  "M 1967,140 L 1955,146 L 1952,146 L 1951,152 L 1865,206 L 1863,206 L 1853,214 L 1851,214 L 1851,216 L 1865,209 L 1909,181 L 1911,181 L 1952,155 L 1964,149 L 1969,145 L 1969,140",
  "M 737,97 L 736,109 L 734,114 L 732,168 L 724,201 L 718,214 L 714,228 L 711,232 L 691,247 L 631,284 L 625,290 L 623,290 L 606,303 L 596,314 L 596,317 L 598,319 L 603,319 L 616,307 L 629,303 L 650,301 L 656,299 L 668,299 L 675,297 L 689,298 L 674,378 L 670,389 L 670,394 L 662,423 L 660,425 L 660,431 L 658,434 L 658,440 L 656,445 L 653,444 L 651,439 L 628,416 L 601,394 L 563,370 L 554,366 L 553,364 L 550,364 L 526,350 L 487,332 L 447,318 L 441,318 L 438,316 L 433,316 L 411,310 L 382,308 L 378,306 L 350,306 L 340,304 L 300,304 L 291,302 L 237,302 L 208,304 L 203,306 L 196,306 L 166,316 L 143,328 L 143,333 L 148,333 L 173,319 L 184,315 L 188,315 L 190,313 L 206,311 L 211,309 L 237,307 L 304,307 L 349,309 L 410,315 L 430,319 L 433,321 L 438,321 L 441,323 L 458,327 L 460,329 L 470,331 L 472,333 L 475,333 L 504,345 L 554,371 L 575,384 L 610,409 L 636,434 L 648,453 L 657,463 L 662,463 L 665,457 L 667,426 L 671,415 L 675,391 L 677,388 L 681,363 L 683,359 L 683,353 L 685,349 L 685,343 L 687,339 L 687,333 L 689,329 L 689,323 L 691,319 L 693,302 L 696,297 L 715,297 L 730,301 L 755,313 L 759,317 L 769,322 L 786,337 L 788,340 L 788,344 L 770,368 L 770,375 L 777,375 L 794,359 L 800,356 L 808,367 L 820,391 L 836,427 L 844,452 L 849,453 L 849,449 L 847,447 L 843,433 L 829,403 L 827,395 L 805,351 L 825,337 L 831,335 L 832,339 L 821,360 L 821,364 L 823,366 L 826,366 L 833,361 L 861,333 L 865,331 L 867,328 L 869,328 L 870,332 L 864,344 L 854,357 L 854,361 L 850,370 L 850,376 L 856,377 L 870,348 L 878,339 L 881,340 L 878,349 L 878,357 L 883,358 L 891,349 L 901,333 L 905,329 L 907,329 L 908,333 L 888,371 L 888,374 L 892,375 L 903,357 L 907,347 L 921,325 L 921,321 L 923,319 L 923,308 L 916,308 L 893,329 L 890,329 L 887,324 L 880,325 L 877,316 L 875,314 L 871,314 L 865,318 L 846,337 L 843,336 L 843,333 L 845,331 L 845,323 L 843,320 L 838,320 L 806,342 L 801,343 L 800,340 L 822,317 L 826,317 L 829,315 L 828,310 L 812,314 L 803,322 L 798,331 L 794,335 L 792,335 L 774,318 L 745,300 L 738,298 L 727,292 L 719,290 L 699,290 L 697,286 L 715,237 L 748,210 L 795,181 L 830,163 L 860,145 L 866,143 L 887,143 L 895,141 L 896,138 L 895,136 L 886,136 L 884,134 L 872,134 L 857,138 L 815,164 L 771,188 L 746,204 L 728,218 L 724,219 L 723,215 L 729,200 L 737,168 L 737,159 L 742,136 L 743,118 L 741,114 L 741,98 L 739,97",
];

// ============================================================================
// ANIMATION
// ============================================================================
const easeCinematic = [0.22, 1, 0.36, 1];



// Stagger configuration for each signature path segment
const pathTransition = (index) => ({
  delay: index * 0.08,
  duration: 2.8,
  ease: [0.22, 1, 0.36, 1],
});

// ============================================================================
// COMPONENT
// ============================================================================
const Footer = () => {
  const { 
    brandName, navigationItems, whatsappLink, instagramLink, 
    emailLink, callLink, buttonText, statusText 
  } = footerConfig;

    // Explicit mapping: nav item text → actual section id in the DOM
  const navSectionIds = {
    "Home": "hero",
    "Who We Are": "about",
    "In the Studio": "services",
    "Listen": "listen",
    "Trusted By": "trust",
    "Let's Talk": "lets-talk",
  };

  // Split navigation items cleanly into 2 columns for architectural symmetry
  const midPoint = Math.ceil(navigationItems.length / 2);
  const leftColumnLinks = navigationItems.slice(0, midPoint);
  const rightColumnLinks = navigationItems.slice(midPoint);

  return (
    <footer className="master-footer">
      <div className="footer-wrapper">
        
        {/* =============================================================== */}
        {/* SIGNATURE WATERMARK — Background Layer                          */}
        {/* SVG path-drawing animation reveals the signature stroke by stroke */}
        {/* =============================================================== */}
        <div className="signature-watermark">
          <svg
            viewBox="0 0 2120 622"
            className="signature-svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            {signaturePaths.map((pathData, index) => (
              <motion.path
                key={index}
                d={pathData}
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={pathTransition(index)}
              />
            ))}
          </svg>
        </div>

        {/* Bottom Section: Clean Split Interface */}
        <div className="footer-interface-grid">
          
          {/* Action Panel (Left Side) */}
          <div className="action-panel">
            <div className="live-status-badge">
              <span className="pulse-dot"></span>
              <span className="label">{statusText}</span>
            </div>
            
            <a href={callLink} className="cta-call-button">
              {buttonText}
            </a>

            <div className="social-actions-row">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="action-circle-icon" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="action-circle-icon" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={emailLink} className="action-circle-icon" aria-label="Email Studio">
                <MailIcon />
              </a>
            </div>
          </div>

          {/* Navigation Panel (Right Side) */}
          <div className="navigation-panel">
            <div className="nav-links-column">
              {leftColumnLinks.map((item) => (
                <a key={item} href={`#${navSectionIds[item] || item.toLowerCase().replace(/\s+/g, '-')}`} className="footer-nav-item">
                  {item}
                </a>
              ))}
            </div>
            <div className="nav-links-column">
              {rightColumnLinks.map((item) => (
                <a key={item} href={`#${navSectionIds[item] || item.toLowerCase().replace(/\s+/g, '-')}`} className="footer-nav-item">
                  {item}
                </a>
              ))}
            </div>
          </div>
          
        </div>

        {/* =============================================================== */}
        {/* DEVELOPER CREDIT — Bottom of footer                              */}
        {/* =============================================================== */}
        <div className="developer-credit">
          Developed by <span className="credit-name">Seyyon Collective</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
