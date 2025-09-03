<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue chez Tililab</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:50px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color:#0097aa;padding:30px;">
                            <h1 style="color:#ffffff;font-size:24px;margin:0;">Bienvenue chez Tililab !</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:30px;color:#333333;">
                            <p>Bonjour <strong>{{ $name }}</strong>,</p>
                            <p>Nous sommes ravis de vous accueillir sur la plateforme <strong>Tililab</strong>.</p>

                            <p>Voici vos informations de connexion :</p>

                            <!-- Credentials Table -->
                            <table cellpadding="10" cellspacing="0" style="margin:15px 0;border:1px solid #ddd;border-radius:5px;width:100%;max-width:400px;">
                                <tr style="background-color:#f0f0f0;">
                                    <td style="font-weight:bold;border-bottom:1px solid #ddd;">Email</td>
                                    <td style="border-bottom:1px solid #ddd;">{{ $email }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight:bold;">Mot de passe</td>
                                    <td>{{ $password }}</td>
                                </tr>
                            </table>

                            <p style="margin-top:20px;">Pour accéder directement à votre compte, cliquez sur le bouton ci-dessous :</p>

                            <!-- Login Button -->
                            <div style="text-align:center;margin:20px 0;">
                                <a href="{{ url('/login') }}" style="background-color:#0097aa;color:#ffffff;padding:12px 25px;text-decoration:none;border-radius:5px;display:inline-block;font-weight:bold;">Se connecter</a>
                            </div>

                            <p>Nous vous recommandons de changer votre mot de passe après votre première connexion pour des raisons de sécurité.</p>

                            <p>À bientôt,<br><strong>L’équipe Tililab</strong></p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color:#f0f0f0;padding:20px;color:#888888;font-size:12px;">
                            &copy; {{ date('Y') }} Tililab. Tous droits réservés.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
