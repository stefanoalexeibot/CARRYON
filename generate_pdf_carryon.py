#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera la propuesta comercial de Plataforma Digital LMS para CarryOn en PDF.
Optimizado 100% para IMPRESION EN BLANCO Y NEGRO (Monocromatico), maxima legibilidad
y cierre presencial por Alejandro Luna (Northpeak Digital).
v2 - Secciones con KeepTogether para evitar cortes entre paginas.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)

# ---------------------------------------------------------------
# PALETA MONOCROMATICA
# ---------------------------------------------------------------
WHITE         = colors.HexColor('#FFFFFF')
BLACK         = colors.HexColor('#000000')
DARK_CHARCOAL = colors.HexColor('#1E1E1E')
GREY_TEXT     = colors.HexColor('#333333')
GREY_MUTED    = colors.HexColor('#555555')
LINE_MEDIUM   = colors.HexColor('#666666')

BG_LIGHT_GRAY = colors.HexColor('#F2F2F2')
BG_TINT_GRAY  = colors.HexColor('#F8F8F8')

PAGE_W, PAGE_H = letter

# ---------------------------------------------------------------
# ESTILOS TIPOGRAFICOS
# ---------------------------------------------------------------
cover_kicker = ParagraphStyle('CoverKicker', fontName='Helvetica-Bold', fontSize=10,
                               textColor=BLACK, alignment=TA_CENTER, leading=14, spaceAfter=18)
cover_title = ParagraphStyle('CoverTitle', fontName='Times-Bold', fontSize=44,
                              textColor=BLACK, alignment=TA_CENTER, leading=48, spaceAfter=12)
cover_subtitle = ParagraphStyle('CoverSubtitle', fontName='Times-Italic', fontSize=16,
                                 textColor=GREY_TEXT, alignment=TA_CENTER, leading=22, spaceAfter=28)
cover_tagline = ParagraphStyle('CoverTagline', fontName='Helvetica', fontSize=11,
                                textColor=DARK_CHARCOAL, alignment=TA_CENTER, leading=17)
cover_meta = ParagraphStyle('CoverMeta', fontName='Helvetica', fontSize=10,
                             textColor=GREY_MUTED, alignment=TA_CENTER, leading=16, spaceBefore=50)

kicker = ParagraphStyle('Kicker', fontName='Helvetica-Bold', fontSize=9,
                         textColor=BLACK, spaceAfter=3, leading=12)
h1 = ParagraphStyle('H1', fontName='Times-Bold', fontSize=20, textColor=BLACK,
                     spaceBefore=0, spaceAfter=3, leading=23)
h2 = ParagraphStyle('H2', fontName='Helvetica-Bold', fontSize=12.5, textColor=BLACK,
                     spaceBefore=10, spaceAfter=4, leading=15)
body = ParagraphStyle('Body', fontName='Helvetica', fontSize=10, textColor=GREY_TEXT,
                       leading=14.5, spaceAfter=8, alignment=TA_JUSTIFY)
bullet_style = ParagraphStyle('Bullet', fontName='Helvetica', fontSize=9.5,
                               textColor=DARK_CHARCOAL, leading=13.5, spaceAfter=4,
                               leftIndent=14, firstLineIndent=-14)

callout_title = ParagraphStyle('CalloutTitle', fontName='Times-Bold', fontSize=13,
                                textColor=BLACK, leading=16, spaceAfter=4)
callout_body = ParagraphStyle('CalloutBody', fontName='Helvetica', fontSize=9.5,
                               textColor=GREY_TEXT, leading=14)

table_cell = ParagraphStyle('TableCell', fontName='Helvetica', fontSize=9.2,
                             textColor=GREY_TEXT, leading=13)
table_cell_bold = ParagraphStyle('TableCellBold', fontName='Helvetica-Bold', fontSize=9.5,
                                  textColor=BLACK, leading=13)
table_head = ParagraphStyle('TableHead', fontName='Helvetica-Bold', fontSize=9.5,
                             textColor=BLACK, leading=12)
price_cell = ParagraphStyle('PriceCell', fontName='Times-Bold', fontSize=11.5,
                             textColor=BLACK, leading=14, alignment=TA_CENTER)
save_cell = ParagraphStyle('SaveCell', fontName='Helvetica-Bold', fontSize=9.5,
                            textColor=BLACK, leading=13, alignment=TA_CENTER)

roi_title = ParagraphStyle('RoiTitle', fontName='Times-Bold', fontSize=14,
                            textColor=BLACK, alignment=TA_CENTER, spaceAfter=4)
roi_body = ParagraphStyle('RoiBody', fontName='Helvetica', fontSize=9.8,
                            textColor=GREY_TEXT, leading=14.5, alignment=TA_CENTER)

sign_title = ParagraphStyle('SignTitle', fontName='Helvetica-Bold', fontSize=9.5,
                             textColor=BLACK, leading=13)
sign_sub = ParagraphStyle('SignSub', fontName='Helvetica', fontSize=8.5,
                           textColor=GREY_TEXT, leading=12)
note_style = ParagraphStyle('Note', fontName='Helvetica-Oblique', fontSize=8.2,
                             textColor=GREY_MUTED, spaceAfter=3)


def hrule(color=BLACK, thickness=1.5, space_after=10):
    return HRFlowable(width="100%", thickness=thickness, color=color,
                      spaceBefore=2, spaceAfter=space_after, hAlign='LEFT')


def cell(text, style=table_cell):
    return Paragraph(text, style)


def bullets_block(h2_text, items, extra_body=None):
    """Devuelve un KeepTogether con un titulo h2 + lista de bullets (no se corta entre paginas)."""
    elems = [Paragraph(h2_text, h2)]
    if extra_body:
        elems.append(Paragraph(extra_body, body))
    for it in items:
        elems.append(Paragraph("\u2022 " + it, bullet_style))
    return KeepTogether(elems)


# ---------------------------------------------------------------
# DECORACION DE PAGINAS
# ---------------------------------------------------------------
def on_page(canvas, doc):
    page_num = canvas.getPageNumber()
    canvas.saveState()

    if page_num == 1:
        m = 24
        canvas.setStrokeColor(BLACK)
        canvas.setLineWidth(1.5)
        canvas.rect(m, m, PAGE_W - 2 * m, PAGE_H - 2 * m, fill=0, stroke=1)
        canvas.setStrokeColor(LINE_MEDIUM)
        canvas.setLineWidth(0.6)
        canvas.rect(m + 4, m + 4, PAGE_W - 2 * (m + 4), PAGE_H - 2 * (m + 4), fill=0, stroke=1)
    else:
        canvas.setStrokeColor(BLACK)
        canvas.setLineWidth(1.2)
        canvas.line(0.75 * inch, PAGE_H - 0.65 * inch, PAGE_W - 0.75 * inch, PAGE_H - 0.65 * inch)
        canvas.setFont('Times-Bold', 10)
        canvas.setFillColor(BLACK)
        canvas.drawString(0.75 * inch, PAGE_H - 0.53 * inch, "CARRYON")
        canvas.setFont('Helvetica-Bold', 8.5)
        canvas.setFillColor(GREY_MUTED)
        canvas.drawRightString(PAGE_W - 0.75 * inch, PAGE_H - 0.53 * inch,
                               "Propuesta Comercial  |  Plataforma Digital LMS")
        canvas.setStrokeColor(LINE_MEDIUM)
        canvas.setLineWidth(0.6)
        canvas.line(0.75 * inch, 0.6 * inch, PAGE_W - 0.75 * inch, 0.6 * inch)
        canvas.setFont('Helvetica-Bold', 8.5)
        canvas.setFillColor(BLACK)
        canvas.drawString(0.75 * inch, 0.43 * inch, "Northpeak Digital")
        canvas.setFont('Helvetica', 8.5)
        canvas.setFillColor(GREY_MUTED)
        canvas.drawString(1.8 * inch, 0.43 * inch, "  |  www.northpeakdigital.com.mx")
        canvas.drawRightString(PAGE_W - 0.75 * inch, 0.43 * inch, f"Pagina {page_num}")

    canvas.restoreState()


# ---------------------------------------------------------------
# CONSTRUCCION DEL DOCUMENTO
# ---------------------------------------------------------------
output_pdf_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Propuesta_CarryOn.pdf")

doc = SimpleDocTemplate(
    output_pdf_path,
    pagesize=letter,
    leftMargin=0.75 * inch, rightMargin=0.75 * inch,
    topMargin=0.90 * inch, bottomMargin=0.85 * inch,
    title="Propuesta Comercial Plataforma Digital LMS - CarryOn",
    author="Alejandro Luna - Northpeak Digital",
)

story = []

# ===============================================================
# PAGINA 1: PORTADA
# ===============================================================
story.append(Spacer(1, 1.6 * inch))
story.append(Paragraph(
    "P R O P U E S T A &nbsp;&nbsp; E S T R A T E G I C A &nbsp;&nbsp; | &nbsp;&nbsp; P L A T A F O R M A &nbsp;&nbsp; D I G I T A L &nbsp;&nbsp; L M S",
    cover_kicker))
story.append(Paragraph("CarryOn", cover_title))
story.append(Paragraph(
    "De la Operacion Manual a un Sistema Digital Autonomo de Capacitacion y Servicios Industriales",
    cover_subtitle))
story.append(Spacer(1, 10))
story.append(HRFlowable(width="30%", thickness=1.5, color=BLACK, spaceBefore=0, spaceAfter=22, hAlign='CENTER'))
story.append(Paragraph(
    "Plataforma LMS &middot; Cursos Presenciales y Virtuales &middot; Generador DC3 Oficial STPS &middot; Panel CMS Autonomo",
    cover_tagline))
story.append(Spacer(1, 8))
story.append(Paragraph(
    "Un sistema completo que le permite a CarryOn gestionar cursos, generar documentos oficiales "
    "y ofrecer servicios industriales &mdash; todo sin depender de la agencia.",
    cover_tagline))
story.append(Paragraph(
    "<b>Presentado a:</b> Direccion General &middot; CarryOn<br/>"
    "<b>Preparado por:</b> Alejandro Luna &middot; Northpeak Digital<br/>"
    "<b>Sitio Web:</b> www.northpeakdigital.com.mx &middot; <b>Fecha:</b> Julio 2026",
    cover_meta))
story.append(PageBreak())

# ===============================================================
# PAGINA 2: DIAGNOSTICO Y OPORTUNIDAD
# ===============================================================
story.append(KeepTogether([
    Paragraph("DIAGNOSTICO Y OPORTUNIDAD COMERCIAL", kicker),
    Paragraph("La situacion actual de CarryOn y el siguiente nivel", h1),
    hrule(),
    Paragraph(
        "CarryOn cuenta con dos activos de alto valor en el mercado industrial mexicano: "
        "<b>experiencia real en capacitacion de trabajadores</b> y un portafolio de "
        "<b>servicios industriales especializados</b>. Sin embargo, hoy toda esa operacion "
        "depende de procesos manuales, hojas de calculo y documentos fisicos, lo que limita "
        "el crecimiento y la profesionalizacion ante clientes corporativos.", body),
]))

story.append(bullets_block("Hallazgos Clave en la Operacion Actual", [
    "<b>Sin infraestructura digital propia:</b> Los cursos no tienen plataforma, "
    "lo que dificulta la escala y la venta a empresas medianas y grandes.",
    "<b>DC3 generado manualmente:</b> El documento oficial STPS se elabora a mano por cada "
    "trabajador, consumiendo horas operativas por evento de capacitacion.",
    "<b>Servicios industriales sin catalogo profesional:</b> Los clientes no tienen un punto "
    "digital de contacto, lo que genera perdida de prospectos de cotizacion.",
    "<b>Dependencia total de la agencia:</b> Cualquier cambio de curso o precio requiere "
    "intervencion externa, generando costos y retrasos innecesarios.",
    "<b>Sin registro de evidencias:</b> No existe sistema para almacenar listas de asistencia, "
    "examenes, fotografias o resultados de aprendizaje por curso.",
]))

story.append(Spacer(1, 8))

story.append(KeepTogether([
    Table([[
        Paragraph("LA OPORTUNIDAD ESTRATEGICA", callout_title),
    ], [
        Paragraph(
            "Las empresas industriales en Mexico exigen cada vez mas proveedores de capacitacion con "
            "respaldo digital y documentacion oficial. Con una plataforma propia, CarryOn puede "
            "<b>competir en licitaciones corporativas, automatizar su operacion y escalar sin "
            "incrementar su equipo administrativo.</b> "
            "El mercado de e-learning industrial en Latinoamerica crece un 22% anual.",
            callout_body),
    ]], colWidths=[6.8 * inch],
    style=TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT_GRAY),
        ('BOX', (0, 0), (-1, -1), 1.2, BLACK),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 14),
        ('RIGHTPADDING', (0, 0), (-1, -1), 14),
    ])),
]))

story.append(PageBreak())

# ===============================================================
# PAGINA 3: PLAN ESTRATEGICO - 4 MODULOS
# ===============================================================
story.append(KeepTogether([
    Paragraph("EL PLAN ESTRATEGICO", kicker),
    Paragraph("Sistema Digital en 4 Modulos Integrados", h1),
    hrule(),
    Paragraph(
        "Diseñamos una plataforma donde CarryOn opera de forma completamente autonoma: "
        "agrega cursos, gestiona videos, genera el DC3 oficial y atiende solicitudes de "
        "servicios industriales &mdash; todo desde su propio panel, sin intervencion de la agencia.",
        body),
]))

story.append(bullets_block("Modulo 1  |  Capacitacion Presencial y Virtual", [
    "<b>Catalogo de cursos presenciales:</b> Fichas, fechas, temario e inscripcion directa con gestion de grupos.",
    "<b>Plataforma de cursos virtuales:</b> Estructura por modulos y lecciones con control de progreso por trabajador.",
    "<b>Videos con acceso controlado:</b> El administrador activa o desactiva el acceso por usuario; preparado para cobros futuros.",
    "<b>Registro de evidencias:</b> Carga de fotografias, listas de asistencia, examenes y resultados por evento.",
]))

story.append(bullets_block("Modulo 2  |  Generador DC3 Oficial STPS", [
    "<b>Formulario inteligente:</b> Captura Nombre, CURP, RFC, Puesto, Empresa, Rep. Legal y Rep. de Trabajadores.",
    "<b>Llenado automatico:</b> El sistema completa el formato oficial DC3 con datos del curso, fechas y duracion.",
    "<b>Exportacion PDF oficial:</b> Genera la Constancia de Habilidades Laborales con el formato exacto STPS, lista para firmar.",
    "<b>Archivo historico:</b> Todos los DC3 quedan almacenados y descargables desde el panel administrativo.",
]))

story.append(bullets_block("Modulo 3  |  Servicios Industriales", [
    "<b>Catalogo profesional:</b> Montacargas (electrico/combustion), Gennie Electrico, Soldadura Inoxidable, "
    "Puertas y OCC Seguridad, Aire Acondicionado, Electricidad y Control de Motores.",
    "<b>Formulario de cotizacion:</b> Clientes solicitan servicios directamente sin exposicion de proveedores externos.",
    "<b>Gestion de solicitudes:</b> El administrador recibe, atiende y da seguimiento desde su panel.",
]))

story.append(bullets_block("Modulo 4  |  Panel CMS Autonomo (100% Sin Agencia)", [
    "<b>Control total de cursos:</b> Agregar, editar, pausar o eliminar cursos, modulos y lecciones desde interfaz visual.",
    "<b>Gestion de usuarios y empresas:</b> Alta de trabajadores, asignacion de cursos y control de accesos.",
    "<b>Administracion de servicios:</b> El equipo de CarryOn actualiza el catalogo de servicios de forma independiente.",
    "<b>Arquitectura lista para pagos:</b> Preparada tecnicamente para activar cobros en linea con Stripe cuando CarryOn lo decida.",
]))

story.append(PageBreak())

# ===============================================================
# PAGINA 4: PROPUESTA COMERCIAL - TABLA DE SERVICIOS
# ===============================================================
story.append(KeepTogether([
    Paragraph("PROPUESTA COMERCIAL", kicker),
    Paragraph("Componentes de la Plataforma (Inversion por Modulo)", h1),
    hrule(),
    Paragraph(
        "Cada componente tiene un costo definido. Al elegir el paquete integral, "
        "la inversion se reduce considerablemente frente al costo individual de cada modulo.",
        body),
    Spacer(1, 4),
]))

services_data = [
    [cell("COMPONENTE", table_head),
     cell("ALCANCE Y ENTREGABLES", table_head),
     cell("INVERSION", table_head)],

    [cell("<b>1. Diseno y Arquitectura Digital</b>", table_cell_bold),
     cell("Sistema de diseno con identidad CarryOn (azul y blanco), tipografia, componentes visuales, "
          "diseno responsivo movil/tablet/escritorio y configuracion del servidor en la nube.", table_cell),
     cell("<b>$8,500</b><br/>MXN", price_cell)],

    [cell("<b>2. Modulo Capacitacion</b><br/>(Presencial + Virtual)", table_cell_bold),
     cell("Catalogo de cursos, modulos y lecciones, reproductor de video, control de progreso, "
          "sistema de registro por empresa y carga de evidencias por evento.", table_cell),
     cell("<b>$18,000</b><br/>MXN", price_cell)],

    [cell("<b>3. Generador DC3 Oficial STPS</b>", table_cell_bold),
     cell("Formulario de captura de datos, generacion automatica del PDF oficial STPS vigente, "
          "almacenamiento historico de constancias y exportacion individual o por grupo.", table_cell),
     cell("<b>$9,500</b><br/>MXN", price_cell)],

    [cell("<b>4. Panel CMS Autonomo</b>", table_cell_bold),
     cell("Interfaz de administracion completa para que CarryOn gestione cursos, modulos, videos, "
          "usuarios, empresas y servicios industriales sin depender de la agencia.", table_cell),
     cell("<b>$12,000</b><br/>MXN", price_cell)],

    [cell("<b>5. Modulo Servicios Industriales</b>", table_cell_bold),
     cell("Catalogo con 8 servicios especializados, fichas por categoria, formulario de cotizacion "
          "y panel de gestion de solicitudes para el equipo de CarryOn.", table_cell),
     cell("<b>$7,500</b><br/>MXN", price_cell)],

    [cell("<b>6. Autenticacion y Roles</b>", table_cell_bold),
     cell("Registro de empresas y trabajadores, roles diferenciados (Admin, Instructor, Empresa, "
          "Trabajador), recuperacion de contrasena y gestion de sesiones seguras.", table_cell),
     cell("<b>$6,500</b><br/>MXN", price_cell)],

    [cell("<b>7. Infraestructura y Despliegue</b>", table_cell_bold),
     cell("Base de datos en la nube, almacenamiento de archivos y videos, despliegue en produccion "
          "con dominio CarryOn y arquitectura preparada para pagos Stripe.", table_cell),
     cell("<b>$4,500</b><br/>MXN", price_cell)],
]

services_table = Table(services_data, colWidths=[1.65 * inch, 3.8 * inch, 1.35 * inch], repeatRows=1)
services_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BG_LIGHT_GRAY),
    ('LINEBELOW', (0, 0), (-1, 0), 1.8, BLACK),
    ('ALIGN', (2, 0), (2, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, BG_TINT_GRAY]),
    ('GRID', (0, 0), (-1, -1), 0.6, LINE_MEDIUM),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('LEFTPADDING', (0, 0), (-1, -1), 7),
    ('RIGHTPADDING', (0, 0), (-1, -1), 7),
]))
story.append(services_table)
story.append(Spacer(1, 7))
story.append(Paragraph(
    "Suma de componentes individuales: <b>$66,500 MXN</b>  |  "
    "Los paquetes integrales representan un ahorro real de hasta <b>$14,600 MXN</b>.",
    note_style))
story.append(Paragraph(
    "Mantenimiento mensual opcional (soporte, actualizaciones, respaldos): desde <b>$2,500 MXN/mes</b>.",
    note_style))

story.append(PageBreak())

# ===============================================================
# PAGINA 5: PAQUETES, ROI Y OFERTA DE CIERRE
# ===============================================================
story.append(KeepTogether([
    Paragraph("OPCIONES DE INVERSION Y RETORNO", kicker),
    Paragraph("Paquetes Integrales y Oferta de Cierre", h1),
    hrule(),
]))

packages_data = [
    [cell("PAQUETE", table_head),
     cell("MODULOS INCLUIDOS", table_head),
     cell("PRECIO", table_head),
     cell("AHORRO", table_head)],

    [cell("<b>Paquete Esencial</b>", table_cell_bold),
     cell("Diseno + Capacitacion (Presencial y Virtual) + Autenticacion + Infraestructura", table_cell),
     cell("<b>$32,900</b> MXN", price_cell),
     cell("<b>$5,600</b> MXN", save_cell)],

    [cell("<b>Paquete Profesional</b>", table_cell_bold),
     cell("Paquete Esencial + <b>DC3 Oficial STPS</b> + Panel CMS Autonomo", table_cell),
     cell("<b>$46,900</b> MXN", price_cell),
     cell("<b>$9,600</b> MXN", save_cell)],

    [cell("<b>Paquete Completo</b>\n- RECOMENDADO -", table_cell_bold),
     cell("<b>Los 7 Modulos Integrados:</b> Capacitacion + DC3 STPS + CMS Autonomo + "
          "Servicios Industriales + Infraestructura + Preparacion Stripe", table_cell),
     cell("<b>$51,900</b> MXN", price_cell),
     cell("<b>$14,600</b> MXN", save_cell)],
]
packages_table = Table(packages_data,
                       colWidths=[1.5 * inch, 3.25 * inch, 1.2 * inch, 0.85 * inch],
                       repeatRows=1)
packages_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BG_LIGHT_GRAY),
    ('LINEBELOW', (0, 0), (-1, 0), 1.8, BLACK),
    ('ALIGN', (2, 0), (3, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, BG_TINT_GRAY]),
    ('GRID', (0, 0), (-1, -1), 0.6, LINE_MEDIUM),
    ('LINEABOVE', (0, 3), (-1, 3), 1.5, BLACK),
    ('LINEBELOW', (0, 3), (-1, 3), 1.5, BLACK),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ('LEFTPADDING', (0, 0), (-1, -1), 7),
    ('RIGHTPADDING', (0, 0), (-1, -1), 7),
]))
story.append(packages_table)
story.append(Spacer(1, 12))

# OFERTA DE CIERRE
off_title_style = ParagraphStyle('OffTitle', fontName='Times-Bold', fontSize=13.5,
                                  textColor=BLACK, alignment=TA_CENTER)
off_sub_style = ParagraphStyle('OffSub', fontName='Helvetica-Oblique', fontSize=9.5,
                                textColor=GREY_TEXT, alignment=TA_CENTER, spaceAfter=6)
off_total_style = ParagraphStyle('OffTotal', fontName='Helvetica-Bold', fontSize=10.5,
                                  textColor=BLACK, alignment=TA_CENTER, spaceBefore=5)

offer_box_data = [
    [Paragraph("OFERTA ESPECIAL DE CIERRE &mdash; PAQUETE COMPLETO", off_title_style)],
    [Paragraph("Exclusiva al confirmar el <b>Paquete Completo</b> durante esta sesion presencial",
               off_sub_style)],
    [Paragraph("\u2022 <b>Ahorro inmediato de $14,600 MXN:</b> Inversion final $51,900 MXN "
               "(en lugar de $66,500 MXN sumando componentes individuales).", bullet_style)],
    [Paragraph("\u2022 <b>Bono 1 &mdash; 2 Meses de Mantenimiento GRATIS:</b> Soporte prioritario "
               "y actualizaciones incluidas ($5,000 MXN de valor).", bullet_style)],
    [Paragraph("\u2022 <b>Bono 2 &mdash; Capacitacion del Equipo CarryOn GRATIS:</b> 2 sesiones de "
               "entrenamiento para manejar el CMS con confianza total (valor $3,000 MXN).", bullet_style)],
    [Paragraph("\u2022 <b>Bono 3 &mdash; Arquitectura de Pagos en Linea Activable:</b> Plataforma lista "
               "para cobros en linea cuando CarryOn lo decida, sin costo adicional.", bullet_style)],
    [Paragraph("\u2022 <b>Garantia de Ajuste de 30 Dias:</b> Revisiones incluidas el primer mes post-lanzamiento.",
               bullet_style)],
    [Paragraph("<b>VALOR TOTAL DE BENEFICIOS Y AHORRO: $22,600 MXN</b>", off_total_style)],
]
offer_box = Table(offer_box_data, colWidths=[6.8 * inch])
offer_box.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT_GRAY),
    ('BOX', (0, 0), (-1, -1), 1.5, BLACK),
    ('TOPPADDING', (0, 0), (-1, -1), 9),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ('LEFTPADDING', (0, 0), (-1, -1), 13),
    ('RIGHTPADDING', (0, 0), (-1, -1), 13),
]))
story.append(KeepTogether([offer_box]))

story.append(Spacer(1, 10))

# ROI
roi_data = [
    [Paragraph("CUANDO SE RECUPERA LA INVERSION?", roi_title)],
    [Paragraph(
        "Un solo curso grupal presencial para empresa con 20 trabajadores cuesta entre $15,000 y $40,000 MXN.<br/>"
        "<b>Con solo 2 a 4 eventos de capacitacion adicionales la inversion completa se recupera.</b><br/>"
        "A partir de ahi, cada curso vendido y cada servicio cotizado representa utilidad directa para CarryOn.",
        roi_body)],
]
roi_table = Table(roi_data, colWidths=[6.8 * inch])
roi_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), WHITE),
    ('BOX', (0, 0), (-1, -1), 1, BLACK),
    ('TOPPADDING', (0, 0), (-1, -1), 9),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ('LEFTPADDING', (0, 0), (-1, -1), 12),
    ('RIGHTPADDING', (0, 0), (-1, -1), 12),
]))
story.append(KeepTogether([roi_table]))

story.append(PageBreak())

# ===============================================================
# PAGINA 6: ACUERDO, PROXIMOS PASOS Y FIRMA
# ===============================================================
story.append(KeepTogether([
    Paragraph("SIGUIENTES PASOS Y ACUERDO", kicker),
    Paragraph("Plan de Inicio y Confirmacion Presencial", h1),
    hrule(),
    Paragraph(
        "Al confirmar la propuesta iniciamos la fase de levantamiento de informacion "
        "(branding, catalogo de cursos, servicios y accesos). "
        "La plataforma se entrega funcional en 6 a 8 semanas habiles.",
        body),
]))

story.append(KeepTogether([
    Paragraph("Seleccion de la Opcion de Trabajo", h2),
    Table([
        [cell("<b>[ &nbsp; ] OPCION A: Paquete Completo  - RECOMENDADO -</b>", table_cell_bold),
         cell("<b>$51,900 MXN</b> &mdash; 7 modulos + Bonos ($8,000 MXN) + Ahorro $14,600 MXN", table_cell)],
        [cell("<b>[ &nbsp; ] OPCION B: Paquete Profesional</b>", table_cell_bold),
         cell("<b>$46,900 MXN</b> &mdash; Capacitacion + DC3 Oficial STPS + CMS Autonomo", table_cell)],
        [cell("<b>[ &nbsp; ] OPCION C: Paquete Esencial</b>", table_cell_bold),
         cell("<b>$32,900 MXN</b> &mdash; Capacitacion Presencial y Virtual + Auth + Infraestructura", table_cell)],
        [cell("<b>[ &nbsp; ] OPCION D: Modulos Individuales</b>", table_cell_bold),
         cell("Especificar modulos: _________________________________________", table_cell)],
    ], colWidths=[2.5 * inch, 4.3 * inch],
    style=TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.8, BLACK),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 9),
        ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ])),
]))

story.append(Spacer(1, 12))

story.append(KeepTogether([
    Paragraph("Esquema de Pago y Compromisos", h2),
    Paragraph("\u2022 <b>Condiciones de Pago:</b> 40% anticipo al firmar, 30% a mitad del desarrollo "
              "y 30% al momento de entrega y lanzamiento oficial.", bullet_style),
    Paragraph("\u2022 <b>Tiempo de Entrega:</b> 6 a 8 semanas habiles desde la recepcion del anticipo "
              "e informacion de marca, cursos y servicios.", bullet_style),
    Paragraph("\u2022 <b>Capacitacion Incluida:</b> 2 sesiones de entrenamiento al equipo CarryOn "
              "para el manejo autonomo del panel de administracion.", bullet_style),
    Paragraph("\u2022 <b>Vigencia de la Propuesta:</b> 15 dias naturales a partir de la presentacion presencial.",
              bullet_style),
    Paragraph("\u2022 <b>Mantenimiento Post-Entrega:</b> Primeros 2 meses incluidos (Paquete Completo). "
              "A partir del tercer mes, mantenimiento opcional desde $2,500 MXN/mes.", bullet_style),
]))

story.append(Spacer(1, 16))

# FIRMA
sign_table = Table([
    [Paragraph("<b>POR CARRYON</b>", sign_title),
     Paragraph("<b>POR NORTHPEAK DIGITAL</b>", sign_title)],
    [Paragraph("<br/><br/>________________________________________<br/>"
               "<b>Nombre y Firma del Responsable</b>", sign_sub),
     Paragraph("<br/><br/>________________________________________<br/>"
               "<b>Alejandro Luna</b>  |  Estrategia Digital", sign_sub)],
    [Paragraph("Fecha: ____ / ____ / 2026", sign_sub),
     Paragraph("Web: www.northpeakdigital.com.mx", sign_sub)],
], colWidths=[3.4 * inch, 3.4 * inch])
sign_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 5),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
]))

story.append(KeepTogether([
    HRFlowable(width="100%", thickness=1, color=BLACK, spaceBefore=8, spaceAfter=13, hAlign='CENTER'),
    Paragraph("<b>ACEPTACION DEL ACUERDO COMERCIAL</b>",
              ParagraphStyle('SignHeader', fontName='Times-Bold', fontSize=13,
                             textColor=BLACK, spaceAfter=8)),
    sign_table,
]))

story.append(PageBreak())

# ===============================================================
# PAGINA 7: PLAN DE TRABAJO — QUE SE HACE Y CUANTO TARDA
# ===============================================================
plan_fase = ParagraphStyle('PlanFase', fontName='Helvetica-Bold', fontSize=10,
                            textColor=BLACK, leading=14)
plan_desc = ParagraphStyle('PlanDesc', fontName='Helvetica', fontSize=9.2,
                            textColor=GREY_TEXT, leading=13.5)
plan_tiempo = ParagraphStyle('PlanTiempo', fontName='Times-Bold', fontSize=10,
                              textColor=BLACK, leading=13, alignment=TA_CENTER)
plan_nota = ParagraphStyle('PlanNota', fontName='Helvetica-Oblique', fontSize=8.5,
                            textColor=GREY_MUTED, leading=12, alignment=TA_CENTER)

story.append(KeepTogether([
    Paragraph("PLAN DE TRABAJO", kicker),
    Paragraph("Lo que se hace y cuanto tiempo toma", h1),
    hrule(),
    Paragraph(
        "A continuacion se describe de forma sencilla cada etapa del proceso de construccion "
        "de la plataforma digital de CarryOn. Cada fase requiere dedicacion exclusiva de nuestro equipo, "
        "revision de calidad y aprobacion antes de continuar a la siguiente.",
        body),
]))

fases = [
    ("FASE",        "QUE SE HACE",                                                  "DURACION APROX."),
    ("1. Analisis\ny Planificacion",
     "Reuniones de levantamiento para entender a fondo todos los procesos de CarryOn. "
     "Se mapean los flujos de trabajo, los tipos de usuario, los documentos que se generan "
     "y como funciona el negocio por dentro. Esta etapa define el 'plano' de toda la plataforma.",
     "3 - 4 dias"),
    ("2. Diseno\nVisual",
     "Se disenan todas las pantallas: la pagina de inicio, el catalogo de cursos, el panel del trabajador, "
     "el panel de la empresa y el panel del administrador. Cada boton, color, tipografia y flujo "
     "es pensado y disenado antes de escribir una sola linea de codigo.",
     "1 semana"),
    ("3. Construccion\ndel Sistema\nde Cursos",
     "Se construye el sistema de cursos presenciales y virtuales: el acceso por usuario, "
     "el seguimiento de avance, la carga de evidencias y el control de videos. "
     "Es la parte mas compleja del proyecto por la cantidad de reglas y conexiones que maneja.",
     "2 semanas"),
    ("4. Generador\nDC3 Oficial",
     "Se construye el formulario y el motor que genera el documento DC3 con el formato oficial "
     "exigido por la autoridad laboral. Requiere precision exacta en el diseno del documento "
     "y validacion de cada campo de datos del trabajador y la empresa.",
     "1 semana"),
    ("5. Panel de\nAdministracion",
     "Se construye el tablero de control desde donde CarryOn gestionara todo de forma autonoma: "
     "cursos, videos, usuarios, empresas, solicitudes y documentos. "
     "Se prueban todos los permisos y niveles de acceso para garantizar que cada usuario "
     "solo vea lo que le corresponde.",
     "1 semana"),
    ("6. Servicios\nIndustriales",
     "Se construye el catalogo de servicios con fichas de cada especialidad y el formulario "
     "de solicitud de cotizacion. Se conecta con el panel de administracion para gestion interna.",
     "3 - 4 dias"),
    ("7. Pruebas\ny Ajustes",
     "Se realizan pruebas exhaustivas en computadora, tablet y celular. Se simulan escenarios reales "
     "de uso: un trabajador tomando un curso, una empresa registrando a su equipo, "
     "un administrador generando un DC3. Se corrigen detalles y se pule la experiencia.",
     "1 semana"),
    ("8. Capacitacion\ny Lanzamiento",
     "Se capacita al equipo de CarryOn en el uso del panel de administracion. "
     "Se realizan las verificaciones finales, se activa el dominio de CarryOn "
     "y la plataforma queda disponible al publico.",
     "2 - 3 dias"),
]

plan_rows = []
for row in fases:
    if row[0] == "FASE":
        plan_rows.append([
            cell("<b>FASE</b>", table_head),
            cell("<b>QUE SE HACE EN ESTA ETAPA</b>", table_head),
            cell("<b>DURACION</b>", table_head),
        ])
    else:
        plan_rows.append([
            Paragraph(f"<b>{row[0]}</b>", plan_fase),
            Paragraph(row[1], plan_desc),
            Paragraph(row[2], plan_tiempo),
        ])

plan_table = Table(plan_rows, colWidths=[1.15 * inch, 4.5 * inch, 1.15 * inch], repeatRows=1)
plan_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BG_LIGHT_GRAY),
    ('LINEBELOW', (0, 0), (-1, 0), 1.8, BLACK),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ALIGN', (2, 0), (2, -1), 'CENTER'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, BG_TINT_GRAY]),
    ('GRID', (0, 0), (-1, -1), 0.5, LINE_MEDIUM),
    ('TOPPADDING', (0, 0), (-1, -1), 7),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    # Linea divisora entre grupos de fases
    ('LINEABOVE', (0, 5), (-1, 5), 1, BLACK),
]))
story.append(plan_table)

story.append(Spacer(1, 10))

# Recuadro comparativo: tiempo normal vs. tiempo CarryOn
comparativo_data = [[
    Paragraph("TIEMPO NORMAL EN EL MERCADO",
              ParagraphStyle('CompTit1', fontName='Helvetica-Bold', fontSize=10,
                             textColor=GREY_MUTED, alignment=TA_CENTER)),
    Paragraph("TIEMPO PARA CARRYON",
              ParagraphStyle('CompTit2', fontName='Times-Bold', fontSize=11,
                             textColor=BLACK, alignment=TA_CENTER)),
], [
    Paragraph("4 a 5 meses\n(proyecto sin prioridad exclusiva)",
              ParagraphStyle('CompVal1', fontName='Helvetica', fontSize=11,
                             textColor=GREY_MUTED, alignment=TA_CENTER, leading=16)),
    Paragraph("8 semanas\n(2 meses con atencion y equipo dedicado)",
              ParagraphStyle('CompVal2', fontName='Times-Bold', fontSize=13,
                             textColor=BLACK, alignment=TA_CENTER, leading=18)),
]]
comparativo_table = Table(comparativo_data, colWidths=[3.3 * inch, 3.5 * inch])
comparativo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (0, -1), BG_TINT_GRAY),
    ('BACKGROUND', (1, 0), (1, -1), BG_LIGHT_GRAY),
    ('BOX', (0, 0), (-1, -1), 1.5, BLACK),
    ('LINEBEFORE', (1, 0), (1, -1), 1.5, BLACK),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ('RIGHTPADDING', (0, 0), (-1, -1), 10),
]))
story.append(KeepTogether([comparativo_table]))
story.append(Spacer(1, 8))

# Nota de prioridad
prioridad_data = [[
    Paragraph(
        "CarryOn recibe PRIORIDAD TOTAL de nuestro equipo: recursos, tiempo y enfoque dedicados "
        "exclusivamente a este proyecto durante los 2 meses de desarrollo. "
        "Es por eso que la inversion refleja ese compromiso y velocidad de entrega.",
        ParagraphStyle('PriorBody', fontName='Helvetica-Bold', fontSize=9.5,
                       textColor=BLACK, leading=14.5, alignment=TA_CENTER)),
]]
prioridad_table = Table(prioridad_data, colWidths=[6.8 * inch])
prioridad_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT_GRAY),
    ('BOX', (0, 0), (-1, -1), 1.2, BLACK),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ('LEFTPADDING', (0, 0), (-1, -1), 14),
    ('RIGHTPADDING', (0, 0), (-1, -1), 14),
]))
story.append(KeepTogether([prioridad_table]))
story.append(Spacer(1, 5))
story.append(Paragraph(
    "Northpeak Digital garantiza comunicacion constante, avances semanales y entrega puntual "
    "dentro del plazo acordado.",
    note_style))


story.append(PageBreak())


glosario_intro = ParagraphStyle('GlosIntro', fontName='Helvetica', fontSize=9.8,
                                 textColor=GREY_TEXT, leading=14.5, spaceAfter=10,
                                 alignment=TA_JUSTIFY)
glosario_term = ParagraphStyle('GlosTerm', fontName='Helvetica-Bold', fontSize=9.8,
                                textColor=BLACK, leading=13)
glosario_def = ParagraphStyle('GlosDef', fontName='Helvetica', fontSize=9.2,
                               textColor=GREY_TEXT, leading=13.5)
glosario_ej = ParagraphStyle('GlosEj', fontName='Helvetica-Oblique', fontSize=8.8,
                              textColor=GREY_MUTED, leading=13, spaceAfter=2)

story.append(KeepTogether([
    Paragraph("GLOSARIO DE TERMINOS", kicker),
    Paragraph("Diccionario de Palabras Tecnicas", h1),
    hrule(),
    Paragraph(
        "Este glosario explica en lenguaje sencillo los terminos tecnicos que aparecen en esta propuesta, "
        "para que CarryOn pueda tomar decisiones informadas y con total claridad sobre lo que se esta construyendo.",
        glosario_intro),
]))

# Datos del glosario: (TERMINO, DEFINICION, EJEMPLO)
terminos = [
    (
        "LMS  (Learning Management System)",
        "Es la plataforma digital donde se gestionan y entregan los cursos en linea. "
        "Permite inscribir trabajadores, subir contenido, dar seguimiento al progreso y emitir constancias.",
        "Ejemplo: Cuando un trabajador de empresa X entra a su cuenta y toma el curso de Seguridad en Montacargas, "
        "eso ocurre dentro del LMS de CarryOn."
    ),
    (
        "CMS  (Panel de Administracion de Contenido)",
        "Es el 'tablero de control' desde donde el equipo de CarryOn agrega, edita o elimina cursos, "
        "videos, precios y servicios — sin necesidad de saber programacion ni depender de la agencia.",
        "Ejemplo: El director de CarryOn entra, hace clic en 'Agregar Curso', llena el formulario y el curso "
        "aparece en la plataforma de inmediato."
    ),
    (
        "DC3  (Constancia de Competencias o Habilidades Laborales)",
        "Documento oficial requerido por la STPS que certifica que un trabajador recibio capacitacion. "
        "Es obligatorio para empresas que imparten o reciben capacitacion formal en Mexico.",
        "Ejemplo: Despues de un curso de Soldadura Inox, el sistema genera automaticamente el DC3 de cada "
        "trabajador con todos sus datos y el sello del curso, listo para firmar y presentar ante la autoridad."
    ),
    (
        "STPS  (Secretaria del Trabajo y Prevision Social)",
        "Autoridad del gobierno mexicano que regula la capacitacion laboral. "
        "Exige que toda capacitacion formal cuente con documentacion oficial como el DC3.",
        "Ejemplo: Si una empresa es auditada por la STPS, debe presentar el DC3 firmado de cada trabajador "
        "que recibio capacitacion. La plataforma de CarryOn genera este documento automaticamente."
    ),
    (
        "La Nube  (Servidor en la Nube / Cloud)",
        "Es un sistema de computadoras en internet que almacena y ejecuta la plataforma. "
        "No requiere servidores fisicos propios. La plataforma funciona 24/7 desde cualquier lugar del mundo.",
        "Ejemplo: Un trabajador puede entrar a su curso desde su celular en Monterrey a las 11pm "
        "sin que nadie en CarryOn tenga que hacer nada."
    ),
    (
        "Base de Datos",
        "Es donde se guardan de forma organizada y segura todos los datos: usuarios, cursos, "
        "empresas, DC3, solicitudes de servicios y archivos. Es el 'cerebro' de la plataforma.",
        "Ejemplo: Cuando el administrador busca 'Empresa ABC', la base de datos regresa "
        "todos sus trabajadores, cursos tomados y DC3 generados en segundos."
    ),
    (
        "Stripe  (Pasarela de Pagos)",
        "Es la herramienta que permite cobrar en linea con tarjeta de credito o debito. "
        "Es el equivalente digital de una terminal bancaria, pero integrado dentro de la plataforma.",
        "Ejemplo: En el futuro, cuando CarryOn active los cobros, un trabajador podria pagar su curso "
        "de $1,200 MXN directamente desde la plataforma con su tarjeta, sin llamadas ni transferencias."
    ),
    (
        "Modulo  (dentro de un curso)",
        "Es una unidad de contenido dentro de un curso. Un curso puede tener varios modulos, "
        "y cada modulo puede tener lecciones, videos y evaluaciones.",
        "Ejemplo: El curso 'Mantenimiento de Montacargas' puede tener 3 modulos: "
        "1) Seguridad basica, 2) Revision mecanica, 3) Operacion correcta."
    ),
    (
        "Roles de Usuario",
        "Son los diferentes tipos de cuenta dentro de la plataforma, cada uno con permisos distintos. "
        "Garantizan que cada persona solo vea y haga lo que le corresponde.",
        "Ejemplo: El 'Admin' puede crear cursos y desbloquear videos. "
        "El 'Trabajador' solo puede ver sus cursos asignados. La 'Empresa' solo ve a sus propios trabajadores."
    ),
    (
        "Diseno Responsivo",
        "Significa que la plataforma se adapta automaticamente a cualquier dispositivo: "
        "computadora, tablet o celular, sin perder calidad ni funcionalidad.",
        "Ejemplo: Un inspector de planta puede revisar el catalogo de servicios de CarryOn "
        "desde su celular en el piso de fabrica con la misma experiencia que en oficina."
    ),
    (
        "Despliegue / Deploy (Puesta en Produccion)",
        "Es el proceso de publicar la plataforma en internet para que sea accesible al publico. "
        "Incluye la configuracion del dominio, la seguridad y las pruebas finales.",
        "Ejemplo: Al finalizar el desarrollo, se 'despliega' la plataforma en www.carryon.com.mx "
        "y cualquier empresa puede registrarse y comenzar a usar el sistema."
    ),
    (
        "SSL / HTTPS  (Seguridad del Sitio)",
        "Es el protocolo de seguridad que encripta la informacion entre el usuario y la plataforma. "
        "Aparece como el candado verde en el navegador. Es obligatorio para sitios con datos personales.",
        "Ejemplo: Los datos del CURP, RFC y nombre de cada trabajador viajan cifrados, "
        "por lo que nadie externo puede interceptarlos o robarlos."
    ),
]

# Construir la tabla del glosario
glosario_data = [
    [cell("TERMINO TECNICO", table_head),
     cell("QUE SIGNIFICA Y PARA QUE SIRVE", table_head)],
]

for termino, definicion, ejemplo in terminos:
    contenido = [
        Paragraph(definicion, glosario_def),
        Paragraph(ejemplo, glosario_ej),
    ]
    glosario_data.append([
        cell(f"<b>{termino}</b>", glosario_term),
        contenido,
    ])

# Construir tabla fila por fila compatible con reportlab (celdas con listas de flowables)
# Usamos una tabla con celdas de texto simple para mayor compatibilidad
glosario_rows = [[cell("TERMINO TECNICO", table_head), cell("QUE SIGNIFICA Y PARA QUE SIRVE", table_head)]]
for termino, definicion, ejemplo in terminos:
    glosario_rows.append([
        Paragraph(f"<b>{termino}</b>", glosario_term),
        Paragraph(f"{definicion}<br/><i>{ejemplo}</i>", glosario_def),
    ])

glosario_table = Table(glosario_rows, colWidths=[1.9 * inch, 4.9 * inch], repeatRows=1)
glosario_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BG_LIGHT_GRAY),
    ('LINEBELOW', (0, 0), (-1, 0), 1.8, BLACK),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, BG_TINT_GRAY]),
    ('GRID', (0, 0), (-1, -1), 0.5, LINE_MEDIUM),
    ('TOPPADDING', (0, 0), (-1, -1), 7),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
]))
story.append(glosario_table)

story.append(Spacer(1, 10))
story.append(Paragraph(
    "Si tiene dudas sobre algun termino adicional o sobre el funcionamiento tecnico de la plataforma, "
    "con gusto lo explicamos en la sesion presencial.",
    note_style))

# ---------------------------------------------------------------
# GENERAR DOCUMENTO
# ---------------------------------------------------------------
doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f"PDF generado correctamente en: {output_pdf_path}")
