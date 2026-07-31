from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate
from reportlab.pdfgen import canvas as pdfcanvas
import os

OUTPUT_PATH = r"D:\Dumps\getclaims\GetClaims\GetClaims_Cost_Estimation.pdf"

# ── Colours ──────────────────────────────────────────────────────────────────
PRIMARY    = colors.HexColor("#0d6efd")   # blue
DARK       = colors.HexColor("#1a1a2e")   # near-black
ACCENT     = colors.HexColor("#e8f0fe")   # light blue fill
GOLD       = colors.HexColor("#f5a623")   # highlight
WHITE      = colors.white
LIGHT_GRAY = colors.HexColor("#f7f7f7")
MID_GRAY   = colors.HexColor("#dee2e6")
TEXT_GRAY  = colors.HexColor("#495057")

PAGE_W, PAGE_H = A4

# ── Header / Footer ──────────────────────────────────────────────────────────
def draw_header_footer(canvas, doc):
    canvas.saveState()
    # Top bar
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, PAGE_H - 1.1*cm, PAGE_W, 1.1*cm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(1.5*cm, PAGE_H - 0.75*cm, "GetClaims — Project Cost Estimation")
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(PAGE_W - 1.5*cm, PAGE_H - 0.75*cm, "Confidential | May 2026")

    # Bottom bar
    canvas.setFillColor(DARK)
    canvas.rect(0, 0, PAGE_W, 0.8*cm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(1.5*cm, 0.28*cm, "getclaims.in  |  support@getclaims.in")
    canvas.drawRightString(PAGE_W - 1.5*cm, 0.28*cm, f"Page {doc.page}")
    canvas.restoreState()

# ── Cover Page ────────────────────────────────────────────────────────────────
def draw_cover(canvas, doc):
    canvas.saveState()
    # Full dark background
    canvas.setFillColor(DARK)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Blue accent block
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, PAGE_H*0.38, PAGE_W, PAGE_H*0.02, fill=1, stroke=0)

    # Company name
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 36)
    canvas.drawCentredString(PAGE_W/2, PAGE_H*0.72, "GetClaims")
    canvas.setFont("Helvetica", 14)
    canvas.setFillColor(colors.HexColor("#adb5bd"))
    canvas.drawCentredString(PAGE_W/2, PAGE_H*0.66, "getclaims.in  |  Insurance Claim Assistance")

    # Title box
    canvas.setFillColor(PRIMARY)
    canvas.roundRect(2.5*cm, PAGE_H*0.44, PAGE_W - 5*cm, 3.6*cm, 8, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 22)
    canvas.drawCentredString(PAGE_W/2, PAGE_H*0.55, "Project Cost Estimation")
    canvas.setFont("Helvetica", 12)
    canvas.drawCentredString(PAGE_W/2, PAGE_H*0.50, "Website Development — Phase 1 & Phase 2")

    # Meta info
    canvas.setFillColor(colors.HexColor("#adb5bd"))
    canvas.setFont("Helvetica", 10)
    canvas.drawCentredString(PAGE_W/2, PAGE_H*0.34, "Prepared By: Development Team")
    canvas.drawCentredString(PAGE_W/2, PAGE_H*0.31, "Date: May 2026")
    canvas.drawCentredString(PAGE_W/2, PAGE_H*0.28, "Rate: Rs. 800 per hour")

    # Bottom strip
    canvas.setFillColor(GOLD)
    canvas.rect(0, 0, PAGE_W, 0.9*cm, fill=1, stroke=0)
    canvas.setFillColor(DARK)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawCentredString(PAGE_W/2, 0.3*cm, "CONFIDENTIAL — For Business Owner Review Only")

    canvas.restoreState()

# ── Styles ────────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, **kw)

style_h1 = S("H1", fontSize=15, fontName="Helvetica-Bold",
             textColor=DARK, spaceAfter=6, spaceBefore=14, leading=20)
style_h2 = S("H2", fontSize=11, fontName="Helvetica-Bold",
             textColor=WHITE, spaceAfter=4, spaceBefore=10, leading=15,
             backColor=PRIMARY, leftIndent=-2, rightIndent=-2,
             borderPadding=(5, 8, 5, 8))
style_h3 = S("H3", fontSize=10, fontName="Helvetica-Bold",
             textColor=PRIMARY, spaceAfter=4, spaceBefore=8)
style_body = S("Body", fontSize=9, fontName="Helvetica",
               textColor=TEXT_GRAY, spaceAfter=4, leading=14)
style_note = S("Note", fontSize=8, fontName="Helvetica-Oblique",
               textColor=TEXT_GRAY, spaceAfter=4, leading=12)
style_center = S("Center", fontSize=9, fontName="Helvetica",
                 alignment=TA_CENTER, textColor=TEXT_GRAY)
style_total_label = S("TotLabel", fontSize=10, fontName="Helvetica-Bold",
                      textColor=DARK, alignment=TA_LEFT)
style_total_val = S("TotVal", fontSize=10, fontName="Helvetica-Bold",
                    textColor=PRIMARY, alignment=TA_RIGHT)

# ── Table helpers ─────────────────────────────────────────────────────────────
def detail_table(data, col_widths, header_bg=PRIMARY):
    t = Table(data, colWidths=col_widths)
    row_count = len(data)
    style = [
        # Header
        ("BACKGROUND",  (0, 0), (-1, 0), header_bg),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, 0), 9),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
        ("TOPPADDING",    (0, 0), (-1, 0), 7),
        # Body
        ("FONTNAME",    (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",    (0, 1), (-1, -1), 8.5),
        ("TEXTCOLOR",   (0, 1), (-1, -1), TEXT_GRAY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_GRAY]),
        ("TOPPADDING",    (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        # Grid
        ("GRID", (0, 0), (-1, -1), 0.4, MID_GRAY),
        ("LINEBELOW", (0, 0), (-1, 0), 1, WHITE),
    ]
    # Bold last row (subtotal)
    style += [
        ("BACKGROUND",  (0, row_count-1), (-1, row_count-1), ACCENT),
        ("FONTNAME",    (0, row_count-1), (-1, row_count-1), "Helvetica-Bold"),
        ("TEXTCOLOR",   (0, row_count-1), (-1, row_count-1), DARK),
    ]
    t.setStyle(TableStyle(style))
    return t

def summary_table(data, col_widths):
    t = Table(data, colWidths=col_widths)
    row_count = len(data)
    style = [
        ("BACKGROUND",  (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, 0), 9),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING",   (0, 0), (-1, -1), 10),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 10),
        ("FONTNAME",    (0, 1), (-1, -2), "Helvetica"),
        ("FONTSIZE",    (0, 1), (-1, -1), 9),
        ("TEXTCOLOR",   (0, 1), (-1, -2), TEXT_GRAY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [WHITE, LIGHT_GRAY]),
        ("GRID", (0, 0), (-1, -1), 0.4, MID_GRAY),
        # Grand total row
        ("BACKGROUND",  (0, row_count-1), (-1, row_count-1), PRIMARY),
        ("TEXTCOLOR",   (0, row_count-1), (-1, row_count-1), WHITE),
        ("FONTNAME",    (0, row_count-1), (-1, row_count-1), "Helvetica-Bold"),
        ("FONTSIZE",    (0, row_count-1), (-1, row_count-1), 10),
    ]
    t.setStyle(TableStyle(style))
    return t

# ── Content builder ───────────────────────────────────────────────────────────
def build_story():
    W = PAGE_W - 3*cm   # usable width

    story = []

    # ── COVER (blank page with custom canvas) — handled separately
    story.append(PageBreak())  # triggers cover on page 1; content starts page 2

    # ════════════════════════════════════════════════════════
    # SECTION 1 — EXECUTIVE SUMMARY
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Executive Summary", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))

    story.append(Paragraph(
        "GetClaims is an Indian insurance claim assistance platform (No Win, No Fee). "
        "The current website has a working frontend but lacks any backend functionality — "
        "contact forms do not submit, no database exists, and no files can be uploaded. "
        "This document covers the complete development scope, effort estimate, and cost "
        "to make the platform fully operational and client-ready.",
        style_body))
    story.append(Spacer(1, 8))

    exec_data = [
        ["", "Hours", "Cost (Rs.)"],
        ["Phase 1 — Launch Ready (forms, admin, email, file upload)", "202", "1,61,600"],
        ["Phase 2 — Growth Features (blog, client portal, SMS, payment)", "87", "69,600"],
        ["Grand Total", "289 hrs", "Rs. 2,31,200"],
    ]
    story.append(summary_table(exec_data, [W*0.6, W*0.2, W*0.2]))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "* Phase 1 delivers a fully live, client-ready website. Phase 2 adds growth "
        "and automation features post-launch.",
        style_note))
    story.append(Spacer(1, 16))

    # ════════════════════════════════════════════════════════
    # SECTION 2 — CURRENT STATE
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Current State Assessment", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))

    cs_data = [
        ["Area", "Status"],
        ["Next.js 14 App Router project", "Done"],
        ["Homepage layout (Header, Hero, Services, Timeline, Testimonials)", "Done"],
        ["About Us / Services / Contact pages", "Template placeholders only"],
        ["Contact form submission", "Non-functional (action='#')"],
        ["Subscribe / inquiry form", "Non-functional (empty handler)"],
        ["API routes", "None exist"],
        ["Database", "None"],
        ["File / document storage", "None"],
        ["Email notifications", "None"],
        ["WhatsApp integration", "None"],
        ["Real content (phone, testimonials, team)", "All placeholders"],
        ["Footer copyright", "Shows 'ib-themes' (template author)"],
    ]
    t = Table(cs_data, colWidths=[W*0.65, W*0.35])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, -1), 8.5),
        ("FONTNAME",    (0, 1), (-1, -1), "Helvetica"),
        ("TEXTCOLOR",   (0, 1), (-1, -1), TEXT_GRAY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_GRAY]),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("GRID", (0, 0), (-1, -1), 0.4, MID_GRAY),
        # Colour the "Done" vs problem rows
        ("TEXTCOLOR", (1, 1), (1, 2), colors.HexColor("#198754")),
        ("FONTNAME",  (1, 1), (1, 2), "Helvetica-Bold"),
        ("TEXTCOLOR", (1, 3), (1, -1), colors.HexColor("#dc3545")),
    ]))
    story.append(t)
    story.append(Spacer(1, 16))

    # ════════════════════════════════════════════════════════
    # SECTION 3 — PHASE 1 DETAIL
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Phase 1 — Launch Ready (Detailed Breakdown)", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))

    # ── Module 1
    story.append(Paragraph("Module 1 — Content & UI Fixes", style_h2))
    story.append(Spacer(1, 4))
    m1 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Replace placeholder phone numbers site-wide", "1", "800"],
        ["Replace duplicate client testimonials with real reviews", "3", "2,400"],
        ["Replace generic cards with real stats (animated counters)", "3", "2,400"],
        ["Fix footer copyright — GetClaims branding", "1", "800"],
        ["Update CTA section messaging", "2", "1,600"],
        ["Build full About Us page (company story, mission, team)", "6", "4,800"],
        ["Build 5 individual Service detail pages", "10", "8,000"],
        ["Build IRDAI Guidelines page", "6", "4,800"],
        ["Code cleanup (remove dead/commented code)", "2", "1,600"],
        ["Module 1 Subtotal", "34", "Rs. 27,200"],
    ]
    story.append(detail_table(m1, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 2
    story.append(Paragraph("Module 2 — Infrastructure Setup (One-time)", style_h2))
    story.append(Spacer(1, 4))
    m2 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Setup Neon Postgres (DB) + Prisma ORM + schema + migrations", "5", "4,000"],
        ["Setup Vercel Blob (document file storage)", "2", "1,600"],
        ["Setup Resend email service + domain verification (@getclaims.in)", "2", "1,600"],
        ["Setup NextAuth.js (admin authentication)", "4", "3,200"],
        ["Environment variables + Vercel deployment configuration", "2", "1,600"],
        ["Module 2 Subtotal", "15", "Rs. 12,000"],
    ]
    story.append(detail_table(m2, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 3
    story.append(Paragraph("Module 3 — Contact Form & Lead Capture", style_h2))
    story.append(Spacer(1, 4))
    m3 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Redesign contact form (add: mobile, city, issue type, consent)", "5", "4,000"],
        ["Build API route — save inquiry to database", "4", "3,200"],
        ["Email to admin on new inquiry (with all form details)", "2", "1,600"],
        ["Auto-reply email to user (confirmation + reference number)", "2", "1,600"],
        ["Form validation (mobile format, required fields, error messages)", "3", "2,400"],
        ["Module 3 Subtotal", "16", "Rs. 12,800"],
    ]
    story.append(detail_table(m3, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 4
    story.append(PageBreak())
    story.append(Paragraph("Module 4 — Case Intake Form + Document Upload (New: /submit-case)", style_h2))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Primary conversion tool — detailed form for submitting a claim case with supporting documents.",
        style_note))
    story.append(Spacer(1, 4))
    m4 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Design & build full case intake form (name, policy details, issue types, amount)", "10", "8,000"],
        ["Multi-file document upload UI (up to 5 files, 5 MB each, PDF/JPG/PNG)", "8", "6,400"],
        ["Upload documents to Vercel Blob storage", "5", "4,000"],
        ["Build API route — save case to DB + save document URLs", "6", "4,800"],
        ["Auto-generate unique case reference number (e.g. GC-2026-0001)", "2", "1,600"],
        ["Email to admin — full case summary with document download links", "3", "2,400"],
        ["Email to user — case registered with reference number", "2", "1,600"],
        ["Success screen with reference number + WhatsApp button", "2", "1,600"],
        ["Module 4 Subtotal", "38", "Rs. 30,400"],
    ]
    story.append(detail_table(m4, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 5
    story.append(Paragraph("Module 5 — Quick Inquiry Widget (Homepage Hero)", style_h2))
    story.append(Spacer(1, 4))
    m5 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Build quick inquiry widget (Name, Mobile, Issue Type, Submit)", "3", "2,400"],
        ["Connect to API — save to DB + notify admin", "2", "1,600"],
        ["Module 5 Subtotal", "5", "Rs. 4,000"],
    ]
    story.append(detail_table(m5, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 6
    story.append(Paragraph("Module 6 — WhatsApp Integration", style_h2))
    story.append(Spacer(1, 4))
    m6 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Floating WhatsApp button (always visible, all pages)", "2", "1,600"],
        ["Fix header phone number — real clickable tel: link", "1", "800"],
        ["Module 6 Subtotal", "3", "Rs. 2,400"],
    ]
    story.append(detail_table(m6, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 7
    story.append(Paragraph("Module 7 — Admin Dashboard (/admin)", style_h2))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Internal password-protected panel for the GetClaims team to manage all leads and cases.",
        style_note))
    story.append(Spacer(1, 4))
    m7 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Admin login page (email + password, secure session)", "5", "4,000"],
        ["Inquiries list (table with filters: date, issue type, status; search)", "8", "6,400"],
        ["Cases list (table with filters: status, policy type, date; search)", "8", "6,400"],
        ["Case detail page (all fields, document download links, history)", "8", "6,400"],
        ["Case status update workflow (New > In Review > Accepted > Resolved)", "5", "4,000"],
        ["Export inquiries / cases to CSV", "5", "4,000"],
        ["Module 7 Subtotal", "39", "Rs. 31,200"],
    ]
    story.append(detail_table(m7, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 8
    story.append(Paragraph("Module 8 — FAQ Page", style_h2))
    story.append(Spacer(1, 4))
    m8 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Build FAQ page with accordion (5 categories, 25-30 questions)", "5", "4,000"],
        ["Write and structure all FAQ content", "4", "3,200"],
        ["Module 8 Subtotal", "9", "Rs. 7,200"],
    ]
    story.append(detail_table(m8, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── Module 9
    story.append(Paragraph("Module 9 — SEO & Analytics", style_h2))
    story.append(Spacer(1, 4))
    m9 = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Add unique SEO meta title + description on every page", "4", "3,200"],
        ["Google Analytics 4 integration", "2", "1,600"],
        ["Structured data / JSON-LD schema (LocalBusiness + FAQPage)", "3", "2,400"],
        ["Auto-generated sitemap.xml + robots.txt", "2", "1,600"],
        ["Module 9 Subtotal", "11", "Rs. 8,800"],
    ]
    story.append(detail_table(m9, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 12))

    # ── QA
    story.append(Paragraph("Testing & Quality Assurance", style_h2))
    story.append(Spacer(1, 4))
    qa = [
        ["Task", "Hours", "Cost (Rs.)"],
        ["Form validation testing (all fields, edge cases, error states)", "6", "4,800"],
        ["API testing (contact form, case submission, file upload)", "5", "4,000"],
        ["Email flow testing (admin notifications + user confirmations)", "4", "3,200"],
        ["Admin dashboard testing (auth, CRUD, CSV export)", "5", "4,000"],
        ["Mobile + cross-browser testing (Chrome, Safari, Firefox; Android + iOS)", "6", "4,800"],
        ["Bug fixes and polish", "6", "4,800"],
        ["QA Subtotal", "32", "Rs. 25,600"],
    ]
    story.append(detail_table(qa, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 16))

    # ── Phase 1 Summary
    story.append(PageBreak())
    story.append(Paragraph("Phase 1 — Complete Summary", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))

    p1_sum = [
        ["Module", "Hours", "Cost (Rs.)"],
        ["Module 1 — Content & UI Fixes", "34", "27,200"],
        ["Module 2 — Infrastructure Setup", "15", "12,000"],
        ["Module 3 — Contact Form & Lead Capture", "16", "12,800"],
        ["Module 4 — Case Intake Form + Document Upload", "38", "30,400"],
        ["Module 5 — Quick Inquiry Widget", "5", "4,000"],
        ["Module 6 — WhatsApp Integration", "3", "2,400"],
        ["Module 7 — Admin Dashboard", "39", "31,200"],
        ["Module 8 — FAQ Page", "9", "7,200"],
        ["Module 9 — SEO & Analytics", "11", "8,800"],
        ["Testing & Quality Assurance", "32", "25,600"],
        ["PHASE 1 TOTAL", "202 hrs", "Rs. 1,61,600"],
    ]
    story.append(summary_table(p1_sum, [W*0.62, W*0.18, W*0.20]))
    story.append(Spacer(1, 16))

    # ════════════════════════════════════════════════════════
    # SECTION 4 — PHASE 2
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Phase 2 — Growth Features", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=6))
    story.append(Paragraph(
        "Recommended 4-6 weeks after Phase 1 launch, once the platform is stable and receiving traffic.",
        style_note))
    story.append(Spacer(1, 8))

    p2 = [
        ["Module", "Description", "Hours", "Cost (Rs.)"],
        ["Blog / IRDAI News",
         "MDX-based blog with listing and article pages.\nBoosts SEO with IRDAI updates and claim tips.", "25", "20,000"],
        ["Client Portal",
         "Mobile OTP login for clients to check\ntheir case status without calling.", "30", "24,000"],
        ["SMS Notifications",
         "Automated SMS via MSG91 — case\nacceptance, status updates, reminders.", "12", "9,600"],
        ["Razorpay Payment",
         "Online success fee collection after\ncase resolution.", "20", "16,000"],
        ["PHASE 2 TOTAL", "", "87 hrs", "Rs. 69,600"],
    ]
    t = Table(p2, colWidths=[W*0.22, W*0.42, W*0.14, W*0.22])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, 0), 9),
        ("FONTNAME",    (0, 1), (-1, -2), "Helvetica"),
        ("FONTSIZE",    (0, 1), (-1, -1), 8.5),
        ("TEXTCOLOR",   (0, 1), (-1, -2), TEXT_GRAY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [WHITE, LIGHT_GRAY]),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("GRID", (0, 0), (-1, -1), 0.4, MID_GRAY),
        ("BACKGROUND",  (0, -1), (-1, -1), PRIMARY),
        ("TEXTCOLOR",   (0, -1), (-1, -1), WHITE),
        ("FONTNAME",    (0, -1), (-1, -1), "Helvetica-Bold"),
        ("FONTSIZE",    (0, -1), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(t)
    story.append(Spacer(1, 16))

    # ════════════════════════════════════════════════════════
    # SECTION 5 — GRAND TOTAL
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Grand Total — Both Phases", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))

    grand = [
        ["", "Hours", "Cost (Rs.)"],
        ["Phase 1 — Launch Ready", "202", "1,61,600"],
        ["Phase 2 — Growth Features", "87", "69,600"],
        ["GRAND TOTAL", "289 hrs", "Rs. 2,31,200"],
    ]
    story.append(summary_table(grand, [W*0.6, W*0.2, W*0.2]))
    story.append(Spacer(1, 16))

    # ════════════════════════════════════════════════════════
    # SECTION 6 — TECH STACK & MONTHLY COST
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Recommended Technology Stack", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))
    story.append(Paragraph(
        "All services below are Vercel-native or integrate seamlessly with Vercel. "
        "No separate server or hosting account is required.",
        style_body))
    story.append(Spacer(1, 6))

    tech = [
        ["Service", "Tool", "Purpose", "Monthly Cost"],
        ["Hosting", "Vercel", "Deploy Next.js site, CI/CD, CDN", "Rs. 0 (free tier)"],
        ["Database", "Neon Postgres", "Store all inquiries, cases, documents metadata", "Rs. 0 (free tier)"],
        ["File Storage", "Vercel Blob", "Store uploaded PDFs, policy docs, rejection letters", "Rs. 0 (free tier)"],
        ["Email", "Resend", "Send notifications to admin and users (3,000 emails/month free)", "Rs. 0 (free tier)"],
        ["Auth", "NextAuth.js", "Secure admin dashboard login", "Rs. 0 (open source)"],
        ["ORM", "Prisma", "Type-safe database queries and migrations", "Rs. 0 (open source)"],
        ["Domain", "getclaims.in", "Already owned", "~Rs. 67/month"],
        ["TOTAL", "", "", "~Rs. 67/month"],
    ]
    t = Table(tech, colWidths=[W*0.18, W*0.2, W*0.38, W*0.24])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, 0), 8.5),
        ("FONTNAME",    (0, 1), (-1, -2), "Helvetica"),
        ("FONTSIZE",    (0, 1), (-1, -1), 8),
        ("TEXTCOLOR",   (0, 1), (-1, -2), TEXT_GRAY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [WHITE, LIGHT_GRAY]),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("GRID", (0, 0), (-1, -1), 0.4, MID_GRAY),
        ("BACKGROUND",  (0, -1), (-1, -1), colors.HexColor("#198754")),
        ("TEXTCOLOR",   (0, -1), (-1, -1), WHITE),
        ("FONTNAME",    (0, -1), (-1, -1), "Helvetica-Bold"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(t)
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Upgrade to Vercel Pro (Rs. 1,700/month) only if team access or advanced CI/CD is needed post-launch.",
        style_note))
    story.append(Spacer(1, 16))

    # ════════════════════════════════════════════════════════
    # SECTION 7 — TIMELINE
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Delivery Timeline", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))

    timeline = [
        ["Week", "Tasks", "Deliverable"],
        ["Week 1", "Content fixes (phone, testimonials, stats, footer). Setup Neon DB, Prisma schema, Resend, Vercel Blob.", "Clean, real-content website live on dev"],
        ["Week 2", "Contact form + API + email notifications. Quick inquiry widget. WhatsApp floating button.", "Working lead capture on homepage + contact page"],
        ["Week 3", "Case intake form + multi-file document upload + API + email flows. Reference number generation.", "Clients can submit cases with documents"],
        ["Week 4", "Admin dashboard — login, inquiries list, cases list, case detail, status update, CSV export.", "Team can manage all leads & cases internally"],
        ["Week 5", "FAQ page. SEO meta tags + GA4 + structured data + sitemap. Full QA + bug fixes.", ""],
        ["Week 6", "Final testing, staging review, production deployment + custom domain.", "PHASE 1 LIVE on getclaims.in"],
        ["Week 7-10", "Phase 2 development (Blog, Client Portal, SMS, Razorpay) — post-launch.", "Full platform complete"],
    ]
    t = Table(timeline, colWidths=[W*0.12, W*0.54, W*0.34])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), DARK),
        ("TEXTCOLOR",   (0, 0), (-1, 0), WHITE),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, 0), 9),
        ("FONTNAME",    (0, 1), (-1, -2), "Helvetica"),
        ("FONTSIZE",    (0, 1), (-1, -1), 8),
        ("TEXTCOLOR",   (0, 1), (-1, -2), TEXT_GRAY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [WHITE, LIGHT_GRAY]),
        ("TOPPADDING",    (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("GRID", (0, 0), (-1, -1), 0.4, MID_GRAY),
        ("BACKGROUND",  (0, -1), (-1, -1), ACCENT),
        ("FONTNAME",    (0, -1), (-1, -1), "Helvetica-Bold"),
        ("TEXTCOLOR",   (0, -1), (-1, -1), PRIMARY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(t)
    story.append(Spacer(1, 16))

    # ════════════════════════════════════════════════════════
    # SECTION 8 — PAYMENT TERMS
    # ════════════════════════════════════════════════════════
    story.append(Paragraph("Suggested Payment Terms — Phase 1", style_h1))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceAfter=10))

    pay = [
        ["Milestone", "Percentage", "Amount (Rs.)"],
        ["Project kickoff + initial setup", "30%", "48,480"],
        ["Modules 3-6 complete (forms, WhatsApp, file upload)", "30%", "48,480"],
        ["Module 7 complete (admin dashboard live)", "20%", "32,320"],
        ["Final delivery + production deployment", "20%", "32,320"],
        ["Phase 1 Total", "100%", "Rs. 1,61,600"],
    ]
    story.append(summary_table(pay, [W*0.55, W*0.2, W*0.25]))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "Note: This estimate covers development work only. Content (testimonials, service descriptions, "
        "about us text, team photos) is to be provided by the client. Third-party costs such as SMS gateway "
        "charges (MSG91) are billed separately at actuals.",
        style_note))

    return story


# ── Document assembly ─────────────────────────────────────────────────────────
class CoverDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)
        frame_cover = Frame(0, 0, PAGE_W, PAGE_H, id="cover")
        frame_main  = Frame(1.5*cm, 1.2*cm, PAGE_W - 3*cm, PAGE_H - 2.8*cm, id="main")
        self.addPageTemplates([
            PageTemplate(id="Cover", frames=[frame_cover], onPage=draw_cover),
            PageTemplate(id="Main",  frames=[frame_main],  onPage=draw_header_footer),
        ])

    def afterFlowable(self, flowable):
        pass


doc = CoverDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    title="GetClaims — Project Cost Estimation",
    author="GetClaims Development Team",
    subject="Website Development Scope & Cost",
)

story = build_story()
doc.build(story)
print(f"PDF saved to: {OUTPUT_PATH}")
