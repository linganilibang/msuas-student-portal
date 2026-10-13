# User flow — MSUAS Student Services Portal

```mermaid
flowchart TD
    A[Open portal] --> B[Home dashboard]
    B --> C{What does the student need?}
    C --> D[Search or filter services]
    C --> E[Use quick-access card]
    C --> F[Use sidebar directory]
    D --> G[Read service summary]
    E --> G
    F --> G
    G --> H[Expand service details]
    H --> I[Open official source to verify]
    G --> J[Prepare an enquiry]
    J --> K[Complete and validate form]
    K --> L[Open email draft in email client]
    B --> M[Explore p5.js service network]
    M --> N[Select node and read description]
```

## Primary path
Home → Search/filter → Service summary → Expand details → Verify official page or prepare an enquiry.

## Alternative paths
- Quick-access card → category-filtered service cards.
- Sidebar directory → matching service card.
- Campus services network → select node → read service-area explanation.
