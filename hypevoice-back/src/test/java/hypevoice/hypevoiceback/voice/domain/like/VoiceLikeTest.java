package hypevoice.hypevoiceback.voice.domain.like;

import hypevoice.hypevoiceback.member.domain.Member;
import hypevoice.hypevoiceback.voice.domain.Voice;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static hypevoice.hypevoiceback.fixture.MemberFixture.SUNKYOUNG;
import static hypevoice.hypevoiceback.fixture.VoiceFixture.VOICE_01;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DisplayName("VoiceLike 도메인 테스트")
public class VoiceLikeTest {
    @Test
    @DisplayName("VoiceLike 생성한다")
    void registerFollow() {
        Member member = SUNKYOUNG.toMember();
        Voice voice = VOICE_01.toVoice(member);

        VoiceLike voiceLike = VoiceLike.registerVoiceLike(member, voice);
        assertAll(
                () -> assertThat(voiceLike.getMember()).isEqualTo(member),
                () -> assertThat(voiceLike.getVoice()).isEqualTo(voice)
        );
    }
}
